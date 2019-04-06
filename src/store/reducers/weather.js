import {
    FETCH_CLEAR_INPUT,
    FETCH_CLEAR_INPUT_VALUE,
    FETCH_INPUT_VALUE,
    FETCH_SEARCH_BUTTON,
    FETCH_WEATHER_DATA_SUCCESS,
    FETCH_WEATHER_START
} from "../actions/actionTypes";

const initialState = {
    loading: false,
    weatherData: [],
    mainWeatherData:null,
    dailyWeatherData:null,
    currentDate:new Date().getTime(),
    query:'',


};
export default function weatherReducer ( state = initialState,action) {
    switch (action.type) {
        case FETCH_WEATHER_START :
            return {
                ...state, loading: true
            };

        case FETCH_WEATHER_DATA_SUCCESS:
            return {
                ...state, mainWeatherData: action.mainWeatherData, dailyWeatherData: action.dailyWeatherData,
                loading: false,
            };
        case FETCH_INPUT_VALUE:
            return {
                ...state, query: action.query
            };
        case FETCH_SEARCH_BUTTON:
            return {
                ...state, touchedSearchBtn: true
            };
        case FETCH_CLEAR_INPUT:
            return {
                ...state, query: ''
            };

      case FETCH_WEATHER_DATA_SUCCESS:
          return{
              ...state,mainWeatherData:action.mainWeatherData,dailyWeatherData:action.dailyWeatherData,
              loading: false,
          };
      case FETCH_INPUT_VALUE:
          return{
              ...state,query:action.query
          };
      case FETCH_SEARCH_BUTTON:
          return {
              ...state,touchedSearchBtn:true
          };
      case FETCH_CLEAR_INPUT_VALUE:
          return {
              ...state,query:""
          };
      default:
          return state;
  }
}

