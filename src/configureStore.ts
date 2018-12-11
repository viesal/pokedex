import { createStore } from 'redux';
import { rootReducer } from './store';

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
