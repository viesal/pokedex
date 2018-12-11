import { action } from 'typesafe-actions';
import { List, ListActionTypes } from './types';

export const fetchRequest = () => action(ListActionTypes.FETCH_REQUEST);
export const fetchSuccess = (data: List[]) => action(ListActionTypes.FETCH_SUCCESS, data);
