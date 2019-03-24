import React from 'react';
import './DailyWeather.css';
const DailyWeather = props =>{
    return(
        <div className='DailyWeather'>
        <h3>Daily Weather</h3>
            <h3>{props.temp}</h3>
            <h3>{props.day}</h3>

        </div>
    )
};
export default DailyWeather;
