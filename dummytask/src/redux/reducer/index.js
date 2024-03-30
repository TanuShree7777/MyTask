import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
const rootReducer = combineReducers({
    users: userReducer,
    // Add more reducers here if needed
  });
  
  export default rootReducer;