import React from 'react';
import './Weather.css';
import ActiveWeather from '../../components/ActiveWeather/ActiveWeather';
import DailyWeather from '../../components/DailyWeather/DailyWeather';


import {connect} from "react-redux";
import {fetchWeather} from "../../store/actions/weather";
import Loader from "../../components/UI/Loader/Loader";
class Weather extends React.Component{
    state= {
      amount:[1,2,3,4,5,6,7]
    };

    renderDailyWeather = ()=> {
        return Object.keys(this.state.amount).map((item, index) => {
            return (
                <li key={index + 'a'}>
                    <DailyWeather/>
                </li>
            );
        });
    };
   async componentDidMount() {
      this.props.fetchWeather();
      console.log(this.props.weatherData);
console.log(this.props.weatherData.city);
    }


    render() {
       console.log(this.props.weatherData);
console.log('Start');

        return(
            <div className="Weather">
                <div className="WeatherWrapper">
<h1>Weather</h1>
                    {this.props.loading || this.props.weatherData.length <= 0 ? <Loader/>
                    :
                        <ActiveWeather
                            city ={this.props.weatherData[this.props.activeWeather].city}
                            temperature ={this.props.weatherData[this.props.activeWeather].list[this.props.activeWeather].main.temp}
                        />
                    }
                    <ul>
                        {this.renderDailyWeather()}
                    </ul>

                </div>
            </div>);
    }
}
function mapStateToProps(state) {
    return{
        loading: state.weather.loading,
        weatherData:state.weather.weatherData,
        activeWeather: state.weather.activeWeather
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchWeather: () =>dispatch(fetchWeather())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Weather);