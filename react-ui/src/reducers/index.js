import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SectorReducer from './SectorReducer';

const reducers = {
  sectorStore: SectorReducer,
  form: formReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
