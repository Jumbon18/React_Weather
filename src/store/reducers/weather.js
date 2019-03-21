import {FETCH_WEATHER_START, FETCH_WEATHER_SUCCESS} from "../actions/actionTypes";

const initialState = {
    loading: false,
    weatherData: [],
    city:null,

};
export default function weatherReducer ( state = initialState,action){
  switch (action.type) {
      case FETCH_WEATHER_START :
          return{
              ...state,loading:true
          };
      case FETCH_WEATHER_SUCCESS:
        return {
            ...state,weatherData:action.response,loading: false,
            city:action.city
        };
      default:
          return state;
  }
}

