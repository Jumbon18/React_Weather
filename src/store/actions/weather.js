import axios from 'axios';
import {FETCH_WEATHER_START, FETCH_WEATHER_SUCCESS} from "./actionTypes";

export function fetchWeather() {
    return async dispatch =>{
        dispatch(fetchWeatherStart());
        try{
            const APIKEY = 'e335452a457543969efee8dcb3b78ad6';
            const response = await axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=Kharkiv&cnt=1&APPID=${APIKEY}`);
            console.log(response);
            const city = response.data.city.name;
            dispatch(fetchWeatherSuccess(response,city));
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