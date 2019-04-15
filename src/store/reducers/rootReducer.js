import {combineReducers} from 'redux';
import weatherReducer from "./weather";
import authReducer from "./auth";
export default combineReducers({
   weather:  weatherReducer,
   auth: authReducer
});