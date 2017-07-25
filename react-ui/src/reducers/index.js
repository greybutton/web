import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SectorReducer from './SectorReducer';
import TaskReducer from './TaskReducer';

const reducers = {
  sectorStore: SectorReducer,
  taskStore: TaskReducer,
  form: formReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
