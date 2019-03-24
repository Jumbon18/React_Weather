import axios from 'axios';
import {FETCH_WEATHER_DATA_SUCCESS, FETCH_WEATHER_START} from "./actionTypes";

export function fetchWeather() {
    return async dispatch => {
        dispatch(fetchWeatherStart());
        try {
            const APIKEY = 'e335452a457543969efee8dcb3b78ad6';
            const dataGlobalAll = await axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=Kharkiv&units=metric&APPID=${APIKEY}`);
            const allWeather = dataGlobalAll.data;
            const mainWeatherData = {
                city:allWeather.city,
                list:[]
            };
            const dailyWeatherData = {
                city:allWeather.city,
                list:[]
            };
            for (let key in allWeather.list[0].main) {

                allWeather.list[0].main[key] = Math.round(allWeather.list[0].main[key]);
            }

            console.log(allWeather);

            allWeather.list.forEach((weather, index) => {
                const fullDate = weather.dt_txt.split(' ');
                const serverDate = fullDate[0].split('-');
                const serverDAY = parseInt(serverDate[2]);

                const currentDate = new Date().getDate();
                if(currentDate === serverDAY){
                    mainWeatherData.list.push(weather)
                }
                else{
                    if((serverDAY !==  parseInt(allWeather.list[index-1].dt_txt.split(' ')[0].split('-')[2])) && index > 0 ){
                        dailyWeatherData.list.push([weather]
                        );
                    }
                   else{
                        dailyWeatherData.list[dailyWeatherData.list.length - 1].push(weather);
                    }

                }

            });
    console.log(mainWeatherData,dailyWeatherData);

            dispatch(fetchWeatherDataSuccess(mainWeatherData,dailyWeatherData));
        } catch (e) {
            console.log(e);
        }
    }


}

export function fetchWeatherStart() {
    return {
        type: FETCH_WEATHER_START
    }
}


export function fetchWeatherDataSuccess(mainWeatherData,dailyWeatherData) {
    return{
        type:FETCH_WEATHER_DATA_SUCCESS,
        mainWeatherData,
        dailyWeatherData
    }
}