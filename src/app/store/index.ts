import { State, createSelector } from '@ngrx/store';

import * as fromFilters from './filter/filter.reducer';

// application's states
export interface AppState {
    filter: fromFilters.State,
}

export const reducers: any = {
    filter: fromFilters.reducer,
};

export const getFilterState = (state: AppState) => state.filter;
export const getFilterType = createSelector(getFilterState, fromFilters.getFilterType);

