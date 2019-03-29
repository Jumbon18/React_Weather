import React from 'react';
import './Weather.css';
import ActiveWeather from '../../components/ActiveWeather/ActiveWeather';
import DailyWeather from '../../components/DailyWeather/DailyWeather';


import {connect} from "react-redux";
import {fetchInputValue, fetchWeather} from "../../store/actions/weather";
import Loader from "../../components/UI/Loader/Loader";
import {url} from "../../Icon/icon";
import Search from "../../components/Search/Search";

class Weather extends React.Component {


    renderDailyWeather = () => {
        return Object.keys(this.props.dailyWeatherData.list).map((item, index) => {
            return (
                <li key={index + 'a'}>
                    <DailyWeather
                        day={this.props.dailyWeatherData.list[index].day}
                        maxTemp={this.props.dailyWeatherData.list[index].maxTemp}
                        minTemp={this.props.dailyWeatherData.list[index].minTemp}
                        icon={`${url}${this.props.dailyWeatherData.list[index].icon}.png`}
                    />
                </li>
            )
        });
    };

shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props.loading !== nextProps.loading;
}

    componentDidMount() {
this.props.fetchWeather();

    }
    searchRequest = event =>{
         event.preventDefault();
         this.props.fetchWeather(this.props.query);
    };

    render() {
        console.log('Render', this.props);
        return (
            <div className="Weather">
                <Search
                    typeInput="text"
                    styleInput="Search-input"
                    query={this.props.query}
                    typeBtn="search"
                    onClick={this.searchRequest}
                    onChange={event => this.props.fetchInput(event.target.value)}
                    placeholder="Searching for weather"
                />
                <div className="WeatherWrapper">


                    {this.props.loading || !this.props.mainWeatherData ? <Loader/>
                        :
                        <React.Fragment>
                            <ActiveWeather
                                city={this.props.mainWeatherData.city.name}
                                temperature={this.props.mainWeatherData.list[0].main.temp}
                                time={this.props.mainWeatherData.time}
                                icon={`${url}${this.props.mainWeatherData.icon}.png`}
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
    return {
        loading: state.weather.loading,
        weatherData: state.weather.weatherData,
        activeWeather: state.weather.activeWeather,
        mainWeatherData: state.weather.mainWeatherData,
        dailyWeatherData: state.weather.dailyWeatherData,
        query: state.weather.query,
        touchedSearchBtn: state.weather.touchedSearchBtn
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchWeather: query => dispatch(fetchWeather(query)),
        fetchInput: value => dispatch(fetchInputValue(value))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);