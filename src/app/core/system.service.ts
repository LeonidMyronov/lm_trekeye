import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/index';
import * as filters from '../store/filter/filter.actions';

import { Zone } from '../models/zone.model';
import { Tag } from "../models/tag.model";
import * as appConstants from './app-constants';
import 'rxjs/add/operator/map';

@Injectable()
export class SystemService {
  private filterState;

  constructor(
    private http: HttpClient,
    private store: Store <fromRoot.AppState>
  ) {
    this.store.select(fromRoot.getFilterState)
    .subscribe(
      filterState => {
        this.filterState = filterState;
      }
    )
    this.getZones()
      .subscribe(
        (response: Zone[]) => {this.store.dispatch(new filters.ZonesAction(response));}
      )

    this.getTags()
      .subscribe(
        (response: Tag[]) => {this.store.dispatch(new filters.TagsAction(response));}
      )
  }

  getZones() {
   return this.http.get(appConstants.APP_SERVER + appConstants.API_ZONE)
  }

  getTags() {
   return this.http.get(appConstants.APP_SERVER + appConstants.API_TAG)
  }

  getTagVisit(queryParams) {
    this.http.get(appConstants.APP_SERVER + appConstants.API_TAG_VISIT, {params: queryParams})   
      .map(
        response => { 
          let modifyObj = {};
          this.filterState.zones.forEach(element => {
            modifyObj[element.name] = response['visits'].filter(el => {
              return el.zone_name === element.name
            } )
          });
          return modifyObj;
        }
      ) 
      .subscribe(
        response => this.store.dispatch(new filters.VisitsAction(response))
      )
  }

  getTagMovement(tagId, queryParams) {
    this.store.dispatch(new filters.DisplayChartAction(false));
    this.http.get(appConstants.APP_SERVER + appConstants.API_TAG_MOVEMENT + tagId, {params: queryParams})
      .map((response: any[]) => {
        const resArr = [];
        for(let i = 0; i < response.length; i += 2) {
          if(response[0].direction === 0) continue;
          if(response[response.length-1].direction === 1 && i == response.length-1) break;
          resArr.push(
            {
              task: response[i].zone_name, 
              startTime: `${new Date(response[i].time).getHours()}:${new Date(response[i].time).getMinutes()}`, 
              endTime: `${new Date(response[i+1].time).getHours()}:${new Date(response[i+1].time).getMinutes()}`
            }
          );
        }
        return resArr;
      })
      .subscribe(
        response => this.store.dispatch(new filters.MovesAction(response))
      )
  }

  createHttpParams(obj: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(obj).forEach(key => httpParams = httpParams.append(key, obj[key]));
    return httpParams;
  }
}