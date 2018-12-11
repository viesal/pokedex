import { Reducer } from 'redux';
import { ListActionTypes, ListState } from './types';

const initialState: ListState = {
  data: {results: [], next: 0},
  loaded: false,
  loading: false,
};

const reducer: Reducer<ListState> = (state = initialState, action) => {
  switch (action.type) {
    case ListActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true, loaded: false };
    }
    case ListActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload, loaded: true };
    }
    default: {
      return state;
    }
  }
};

export { reducer as listReducer };
