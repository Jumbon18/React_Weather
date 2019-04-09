import axios from 'axios';
import {

    FETCH_CLEAR_INPUT, FETCH_CLICKED_SEARCH_ELEMENT,

    FETCH_INPUT_VALUE,
    FETCH_SEARCH_BUTTON, FETCH_SEARCH_SUCCESS,
    FETCH_WEATHER_DATA_SUCCESS,
    FETCH_WEATHER_START
} from "./actionTypes";

function round(objArr) {
    for (let key in objArr) {
        objArr[key] = Math.round(objArr[key]);
    }
}

function getFullCurrent() {
    return ([new Date().getHours(), new Date().getMinutes()].join(":"));
}

function getFullMonth(month) {

    const arrOfMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return arrOfMonth[month - 1];
}


export function fetchWeather(query) {
    return async dispatch => {

        if (query === undefined) {
            query = "Kharkiv";
        }
        dispatch(fetchWeatherStart());

        try {
            const APIKEY = 'e335452a457543969efee8dcb3b78ad6';

            const dataGlobalAll = await axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&APPID=${APIKEY}`);

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

//разбиваем наш большой массив , который мы получили с сервера делим на Main and Daily
            allWeather.list.forEach((weather, index) => {
                const fullDate = weather.dt_txt.split(' ');
                const serverDate = fullDate[0].split('-');
                const serverDAY = parseInt(serverDate[2]);

                const currentDate = new Date().getDate();
// Если текущая дата равна дате с сервера , то мы заполняем массив Main
                if ((currentDate === serverDAY) || allWeather.list[0]) {
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


            dispatch(fetchWeatherDataSuccess(mainWeatherData, dailyWeatherData));
        } catch (e) {
            console.log(e);

        }
    }


}

export function fetchSearchList(query) {


    return async dispatch => {

                try {
                    const dataAll = await axios.get(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${query}`);

                            const searchList = dataAll.data;

                        dispatch(fetchSearchEnd(searchList.slice(0,6)));

                } catch (e) {
                    console.log(e);
                }

            }

}

export function fetchSearchEnd(searchList) {
    return {
        type: FETCH_SEARCH_SUCCESS,
        searchList
    }

}

export function fetchWeatherStart() {
    return {
        type: FETCH_WEATHER_START
    }
}

export function fetchInputValue(query) {
    return (dispatch,getState) => {
        dispatch(fetchInputBase(query));


      dispatch(fetchSearchList(query));



    }
}

export function fetchInputBase(query) {
    return {
        type: FETCH_INPUT_VALUE,
        query
    }
}

export function fetchWeatherDataSuccess(mainWeatherData, dailyWeatherData) {
    return {
        type: FETCH_WEATHER_DATA_SUCCESS,

        mainWeatherData,
        dailyWeatherData
    }
}

export function fetchClearInput() {
    return {
        type: FETCH_CLEAR_INPUT
    }
}

export function fetchSearchButton() {
    return {
        type: FETCH_SEARCH_BUTTON
    }
}
export function fetchClickedSearchElement(element) {
    return (dispatch,getState) =>{
        const list = getState().weather.searchList;

        let clickedQuery;
        list.forEach((item,index) =>{
           if(item.title === element.title){
              clickedQuery = element.title;
           }
        });
       dispatch(fetchSuccessClickedSearch(clickedQuery));
       dispatch(fetchWeather(clickedQuery));
       dispatch(fetchClearInput());
    }
}
export function fetchSuccessClickedSearch(clickedQuery) {
    return {
        type:FETCH_CLICKED_SEARCH_ELEMENT,
        clickedQuery
    }
}