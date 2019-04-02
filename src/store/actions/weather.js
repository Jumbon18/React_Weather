import axios from 'axios';
import {FETCH_INPUT_VALUE, FETCH_SEARCH_BUTTON, FETCH_WEATHER_DATA_SUCCESS, FETCH_WEATHER_START} from "./actionTypes";

function round(objArr) {
    for(let key in objArr){
   objArr[key]  = Math.round(objArr[key]);
    }
}
function getFullCurrent() {
    return ([new Date().getHours(),new Date().getMinutes()].join(":"));
}
function getFullMonth(month) {

    const arrOfMonth= ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return arrOfMonth[month-1];
}



export function fetchWeather(query) {
    return async dispatch => {
        console.log(localStorage);
        if(query  === undefined){
            query = "Kharkiv";
        }
        dispatch(fetchWeatherStart());
console.log(query);
            try {
                const APIKEY = 'e335452a457543969efee8dcb3b78ad6';
                console.log(new Date().getDate());
                const dataGlobalAll = await axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&APPID=${APIKEY}`);
                console.log(dataGlobalAll);
                const allWeather = dataGlobalAll.data;
// Main weather object
                const mainWeatherData = {
                    time: getFullCurrent(),
                    city: allWeather.city,
                    list: []
                };
                // Daily weather object
                const dailyWeatherData = {
                    city: allWeather.city,
                    list: []
                };
// округляем все значения в (темп, осадки и т.Д)
                allWeather.list.forEach(item => {
                    round(item.main);
                });

                console.log(allWeather);
//разбиваем наш большой массив , который мы получили с сервера делим на Main and Daily
                allWeather.list.forEach((weather, index) => {
                    const fullDate = weather.dt_txt.split(' ');
                    const serverDate = fullDate[0].split('-');
                    const serverDAY = parseInt(serverDate[2]);

                    const currentDate = new Date().getDate();
// Если текущая дата равна дате с сервера , то мы заполняем массив Main
                    if ((currentDate === serverDAY) ) {
                        mainWeatherData.list.push(weather);
                        mainWeatherData.icon = weather.weather[0].icon;
                    }
                    //Если дата  не равна , то заполняем массив Daily
                    else {
                        // Если элемент первый по данной дате , создается новый элемент в массиве
                        if ((serverDAY !== parseInt(allWeather.list[index - 1].dt_txt.split(' ')[0].split('-')[2])) && index > 0) {
                            dailyWeatherData.list.push({
                                    day: `${serverDAY}  ${getFullMonth(parseInt(serverDate[1]))}`,
                                    maxTemp: 0,
                                    minTemp: 0,
                                    dayWeather: [weather],
                                }
                            );
                        }
                        // если нет то данные добавляетс в текущий элемент
                        else {
                            dailyWeatherData.list[dailyWeatherData.list.length - 1].dayWeather.push(weather);
                        }

                    }

                });
// insert icon for daily weather
                console.log(mainWeatherData, dailyWeatherData);
// Подсчет максимальной и минимальной тмпр для Daily
                dailyWeatherData.list.forEach((weatherItem, index) => {
                    const dayWeatherArr = dailyWeatherData.list[index].dayWeather;

                    const temperature = dayWeatherArr.map((item, index) => {
                        return item.main.temp;
                    });
                    dailyWeatherData.list[index].maxTemp = Math.max(...temperature);
                    dailyWeatherData.list[index].minTemp = Math.min(...temperature);

                    weatherItem.icon = dayWeatherArr[Math.round((dayWeatherArr.length / 2) - 1)].weather[0].icon;
                });

// Изменияем STORE
                localStorage.setItem('query',query);
                localStorage.setItem('MainData',mainWeatherData);
                localStorage.setItem('DailyData', dailyWeatherData );
                dispatch(fetchWeatherDataSuccess(mainWeatherData, dailyWeatherData));
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

export function fetchInputValue(query) {
    return{
        type:FETCH_INPUT_VALUE,
        query
    }
}

export function fetchWeatherDataSuccess(mainWeatherData,dailyWeatherData) {
    return{
        type:FETCH_WEATHER_DATA_SUCCESS,
        mainWeatherData,
        dailyWeatherData
    }
}
export function fetchSearchButton() {
    return {
        type:FETCH_SEARCH_BUTTON
    }
}