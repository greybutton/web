import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AreaReducer from './AreaReducer';
import TaskReducer from './TaskReducer';

const reducers = {
  areaStore: AreaReducer,
  taskStore: TaskReducer,
  form: formReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
