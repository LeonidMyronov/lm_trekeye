import { Action } from '@ngrx/store';
import { Zone } from '../../models/zone.model';
import { Tag } from '../../models/tag.model';

export const FilterActionTypes = {
  FILTER_TYPE: 'FILTER_TYPE',
  ZONES: 'ZONES',
  TAGS: 'TAGS',
  VISITS: 'VISITS',
  MOVES: 'MOVES',
  DISPLAY_CHART: 'DISPLAY_CHART'
}

export class FilterAction implements Action {
  readonly type = FilterActionTypes.FILTER_TYPE;
  constructor (public payload: string) {}
}

export class ZonesAction implements Action {
  readonly type = FilterActionTypes.ZONES;
  constructor (public payload: Zone[]) {}
}

export class TagsAction implements Action {
  readonly type = FilterActionTypes.TAGS;
  constructor (public payload: Tag[]) {}
}

export class VisitsAction implements Action {
  readonly type = FilterActionTypes.VISITS;
  constructor (public payload: {}) {}
}

export class MovesAction implements Action {
  readonly type = FilterActionTypes.MOVES;
  constructor (public payload: {}) {}
}

export class DisplayChartAction implements Action {
  readonly type = FilterActionTypes.DISPLAY_CHART;
  constructor (public payload: boolean) {}
}

export type FilterActions = 
  FilterAction |
  ZonesAction |
  TagsAction |
  VisitsAction |
  MovesAction
  ;
