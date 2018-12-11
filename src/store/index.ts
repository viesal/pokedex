import { combineReducers } from 'redux';
import { listReducer } from './list/reducer';
import { ListState } from './list/types';

export interface ApplicationState {
  list: ListState;
}

export const rootReducer = combineReducers<ApplicationState>({
  list: listReducer,
});
