import { combineReducers } from "redux"
import { doctorsReducer } from "./doctors"
import { specialitiesReducer } from './specialities';
import { loginReducer } from './login'; 
import { appointmentsReducer } from './appointments';
import { usersReducer } from './users';


export default combineReducers({
  doctors: doctorsReducer,
  specialities: specialitiesReducer,
  login: loginReducer,
  appointments: appointmentsReducer,
  users: usersReducer,
  });

