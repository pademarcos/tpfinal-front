import { combineReducers } from "redux"
import { doctorsReducer } from "./doctors"
import { specialitiesReducer } from './specialities';


export default combineReducers({
  doctors: doctorsReducer,
  specialities: specialitiesReducer,
  });

