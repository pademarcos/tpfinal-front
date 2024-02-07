import { combineReducers } from "redux"
import { doctorsReducer } from "./doctors"
import { specialitiesReducer } from './specialities';
import { loginReducer } from './login'; 


export default combineReducers({
  doctors: doctorsReducer,
  specialities: specialitiesReducer,
  login: loginReducer,
  });

