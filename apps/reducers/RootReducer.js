import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import AuthReducer from './auth';
import ApplicationReducer from './application';

const rootReducer = combineReducers({
  user: UserReducer,

  auth: AuthReducer,
  application: ApplicationReducer,
});

export default rootReducer;
