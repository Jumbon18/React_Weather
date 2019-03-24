import axios from 'axios';
import {FETCH_WEATHER_START, FETCH_WEATHER_SUCCESS} from "./actionTypes";

export function fetchWeather() {
    return async dispatch =>{
        dispatch(fetchWeatherStart());
        try{
            const APIKEY = 'e335452a457543969efee8dcb3b78ad6';
            const dataGlobal = await axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=Kharkiv&units=metric&cnt=1&APPID=${APIKEY}`);
                  const response = [];
            const city = dataGlobal.data.city.name;
            const list = dataGlobal.data.list;

            for(let key in list[0].main){

                list[0].main[key]=Math.round(list[0].main[key]);
            }

response.push({
    city,
    list
});
            dispatch(fetchWeatherSuccess(response));
        }
        catch (e) {
            console.log(e);
        }
    }


}
export function fetchWeatherStart() {
    return{
        type:FETCH_WEATHER_START
    }
}
export function fetchWeatherSuccess(response,city) {
    return{
        type:FETCH_WEATHER_SUCCESS,
        response,
        city
    }
}