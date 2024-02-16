import { combineReducers } from "redux"
import { doctorsReducer } from "./doctors"
import { specialitiesReducer } from './specialities';
import { loginReducer } from './login'; 
import { appointmentsReducer } from './appointments';


export default combineReducers({
  doctors: doctorsReducer,
  specialities: specialitiesReducer,
  login: loginReducer,
  appointments: appointmentsReducer,
  });

