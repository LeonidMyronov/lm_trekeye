import { Component, OnInit } from '@angular/core';
import { SystemService } from '../system.service';
import { Store } from '@ngrx/store';
import { GanttChart } from 'angular-gantt-chart';

import * as fromRoot from '../../store/index';
import * as filters from '../../store/filter/filter.actions';

@Component({
  selector: 'trekeye-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  public filterState: any;
  public zoneParams;
  
  public gantt_ChartData={};
  public gantt_chart_options={
    rectColor:"mediumslateblue",
    lineColor:"green",
    labelColor:"mediumslateblue"
  }
  constructor(
    private system: SystemService,
    private store: Store <fromRoot.AppState>,    
  ) { }

  ngOnInit() {
    this.store.select(fromRoot.getFilterState)
      .subscribe(
        filterState => {
          this.filterState = filterState;
          if( this.filterState.visits !== undefined) {
            this.filterState.zones.forEach(element => {
              element.visits = this.mapZoneState(element.name);
            })
          }
          if(this.filterState.moves) {
            this.gantt_ChartData['taskArray'] = this.filterState.moves;
          }
        }
      )
  }

  mapZoneState(zone: string) {
    const resObj = {};
    let total = 0;
    this.filterState.visits[zone].forEach(element => {
      resObj[element.external_id] = true;
    });
    const arr = Object.keys(resObj).map(key => {
      return { 
        name: key, 
        value: this.filterState.visits[zone].filter(el=>el.external_id === key).reduce((sum, el) => {
          total += +el.direction;
          return sum + +el.direction
        }, 0)
      }
    });
    return {total: total, visits: arr};
  }

}
