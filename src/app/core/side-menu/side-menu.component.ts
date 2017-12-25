import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as appConstants from '../app-constants';
import * as fromRoot from '../../store/index';
import * as filters from '../../store/filter/filter.actions';
@Component({
  selector: 'trekeye-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent implements OnInit {
  public filters;
  constructor(
    private store: Store <fromRoot.AppState>    
  ) { }

  ngOnInit() {
    this.filters = appConstants.FILTERS;
  }

  onFilterChange(filterName: string) {
    this.store.dispatch(new filters.FilterAction(filterName));
  }

}
