import React from 'react';
import './DailyWeather.css';
const DailyWeather = props =>{
    return(
        <div className='DailyWeather'>
        <h3>{props.day}</h3>
           <div className="Daily-temp">
            <h3>{props.maxTemp}°</h3>
            <h3>{props.minTemp}°</h3>
               <img src={props.icon} alt=""/>
           </div>
        </div>
    )
};
export default DailyWeather;
