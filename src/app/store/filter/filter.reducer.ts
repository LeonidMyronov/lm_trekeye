import * as filter from './filter.actions';
import { Zone } from '../../models/zone.model';
import { Tag } from '../../models/tag.model';

export interface State {
  filterType: string,
  zones: Zone[],
  tags: Tag[],
  visits: {}
  moves:any[],
  displayChart: boolean
}

const initialState: State = {
  filterType: '',
  zones: [],
  tags: [],
  visits: undefined,
  moves: null,
  displayChart: false
}  

export function reducer(state: State = initialState, action: filter.FilterActions) {
  switch (action.type) {

    case filter.FilterActionTypes.ZONES: {
      return {
        ...state,
        zones: [...(<Zone[]>action.payload)]
      }
    }
    case filter.FilterActionTypes.TAGS: {
      return {
        ...state,
        tags: [...(<Tag[]>action.payload)]
      }
    }
    case filter.FilterActionTypes.FILTER_TYPE: {
      return {
        ...state,
        filterType: action.payload
      }
    }
    case filter.FilterActionTypes.VISITS: {
      return {
        ...state,
        visits: action.payload
      }
    }
    case filter.FilterActionTypes.MOVES: {
      return {
        ...state,
        moves: [...(<any[]>action.payload)],
        displayChart: true
      }
    }
    case filter.FilterActionTypes.DISPLAY_CHART: {
      return {
        ...state,
        displayChart: action.payload
      }
    }
    default:
      return state
  }
}

export const getFilterType = (state: State) => (state.filterType);
