import React from 'react';
import './ActiveWeather.css';

const ActiveWeather =  props =>{

  return (
<div className="ActiveWeather">
    <h1>{props.city}</h1>
  <h2>{props.temperature}></h2>

</div>
  )  ;
};
export default ActiveWeather;