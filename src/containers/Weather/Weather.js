import React from 'react';
import './Weather.css';
import ActiveWeather from '../../components/ActiveWeather/ActiveWeather';
import DailyWeather from '../../components/DailyWeather/DailyWeather';


import {connect} from "react-redux";
import {fetchWeather} from "../../store/actions/weather";
import Loader from "../../components/UI/Loader/Loader";
class Weather extends React.Component{


    renderDailyWeather = ()=> {
        return Object.keys(this.props.dailyWeatherData.list).map((item,index)=>{
            return (
                <li key={index + 'a'}>
                    <DailyWeather/>
                </li>
            )  });
    };
   async componentDidMount() {
      this.props.fetchWeather();

    }


    render() {

        return(
            <div className="Weather">
                <div className="WeatherWrapper">


                    {this.props.loading || !this.props.mainWeatherData ? <Loader/>
                    :
                        <React.Fragment>
                        <ActiveWeather
                            city ={this.props.mainWeatherData.city.name}
                            temperature ={this.props.mainWeatherData.list[0].main.temp}
                        />
                        <ul>
                        {this.renderDailyWeather()}
                        </ul>
                        </React.Fragment>
                    }


                </div>
            </div>);
    }
}
function mapStateToProps(state) {
    return{
        loading: state.weather.loading,
        weatherData:state.weather.weatherData,
        activeWeather: state.weather.activeWeather,
        mainWeatherData:state.weather.mainWeatherData,
        dailyWeatherData: state.weather.dailyWeatherData
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchWeather: () =>dispatch(fetchWeather())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Weather);