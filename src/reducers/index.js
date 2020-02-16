// Reducer combination tools
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Local Reducers
import applicationReducer from './applicationReducer';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  app: applicationReducer
});

export default createRootReducer;