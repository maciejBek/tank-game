import { createStore, combineReducers } from 'redux';
import gameOnReducer from './reducer';
import multiGameOnReducer from './reducer';

const rootReducer = combineReducers({
    gameOn: gameOnReducer,
    multiGameOn: multiGameOnReducer
  });

const store = createStore(
    rootReducer
);

export default store;