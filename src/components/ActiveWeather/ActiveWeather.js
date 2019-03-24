import React from 'react';
import './ActiveWeather.css';

const ActiveWeather =  props =>{

  return (
<div className="ActiveWeather">
    <h1>{props.city}</h1>
  <h2>{props.temperature}</h2>
  <div className="w-description">
    <p id="desc-1">В основном облачно</p>
    <p id="desc-2">Обновлено в 14:45</p>
  </div>
</div>
  )  ;
};
export default ActiveWeather;