import {FETCH_WEATHER_DATA_SUCCESS, FETCH_WEATHER_START} from "../actions/actionTypes";

const initialState = {
    loading: false,
    weatherData: [],
    mainWeatherData:null,
    dailyWeatherData:null,
    activeWeather:0

};
export default function weatherReducer ( state = initialState,action){
  switch (action.type) {
      case FETCH_WEATHER_START :
          return{
              ...state,loading:true
          };

      case FETCH_WEATHER_DATA_SUCCESS:
          return{
              ...state,mainWeatherData:action.mainWeatherData,dailyWeatherData:action.dailyWeatherData,
              loading: false,
          };
      default:
          return state;
  }
}

