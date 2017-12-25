import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../store/index';
import * as filters from '../store/filter/filter.actions';
import { MatDatepickerInputEvent } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SystemService } from '../core/system.service';

@Component({
  selector: 'trekeye-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.sass']
})
export class FilterPanelComponent implements OnInit {
  public filterState: any;
  filterForm: FormGroup;
  constructor(
    private store: Store <fromRoot.AppState>,
    private system: SystemService
  ) {}

  ngOnInit() {
    this.createForm();
    this.store.select(fromRoot.getFilterType)
      .subscribe(
        response => {
          this.filterForm.reset();
        }
      );
    this.store.select(fromRoot.getFilterState)
      .subscribe(
        filterState => {
          this.filterState = filterState;
        }
      );
    this.filterForm.valueChanges
      .subscribe(
        values => {
          const params = {
            from: +this.filterForm.get('start_date').value,
            to: +this.filterForm.get('end_date').value
          }
          if(this.filterState.filterType === 'zones' && values.start_date && values.end_date) {
            this.system.getTagVisit(params)
          } 
          if(this.filterState.filterType === 'tags' && values.start_date && values.end_date && values.event) {
           this.system.getTagMovement(this.filterForm.get('event').value, params);
          }
        }
      );
  }
  
  createForm() {
    this.filterForm = new FormGroup({
      'event': new FormControl(null, Validators.required),
      'start_date': new FormControl(null, Validators.required),
      'end_date': new FormControl(null, Validators.required)
    });
  }

}
