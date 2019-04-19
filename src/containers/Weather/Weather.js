import React from 'react';
import './Weather.scss';
import ActiveWeather from '../../components/ActiveWeather/ActiveWeather';
import DailyWeather from '../../components/DailyWeather/DailyWeather';
import like from "../../images/like.png";

import {connect} from "react-redux";
import {
    fetchAddToFavorites,
    fetchClearInput,
    fetchClickedSearchElement,
    fetchInputValue,
    fetchSearchList,
    fetchWeather
} from "../../store/actions/weather";
import Loader from "../../components/UI/Loader/Loader";
import {url} from "../../Icon/icon";
import Search from "../../components/Search/Search";
import SearchList from "./SearchList/SearchList";
import Button from "../../components/UI/Button/Button";

class Weather extends React.Component {


    renderDailyWeather = () => {
        return Object.keys(this.props.dailyWeatherData.list).map((item, index) => {
            return (
                <li key={index + 'a'} className="daily-list">
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
    return( (this.props.loading !== nextProps.loading) || (this.props.query !== nextProps.query));
}

    componentDidMount() {
this.props.fetchWeather(this.props.query);

    }
    searchRequest =  event =>{

    event.preventDefault();
    if(this.props.query){
        this.props.fetchClearInput();

             this.props.fetchWeather(this.props.query);

         }
    };


    render() {
        console.log('Render', this.props,'----------------------');
        return (
            <div className="Weather">
                <Search
                    typeInput="text"
                    styleInput="Search-input"
                    query={this.props.query}
                    typeBtn="btn-1"
                    onClick={ this.searchRequest}
                    onChange={event => this.props.fetchInput(event)}
                    placeholder="Searching for weather"
                />
                {this.props.query ?    <SearchList
                    searchList={this.props.searchList}
                    clickedSearch={this.props.fetchClickedSearchElement}

                />: null    }
                <Button
                    typeBtn="favorite-btn"
                    onClick={this.props.fetchAddToFavorites}
                >
                    <div className="fav-div">
                        <img src={like} alt="like" className="like-pic"/>
                        <div className="like-text">Favorite this!</div>
                    </div>
                </Button>

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
        touchedSearchBtn: state.weather.touchedSearchBtn,
        searchList:state.weather.searchList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchWeather: query => dispatch(fetchWeather(query)),
        fetchInput: event => dispatch(fetchInputValue(event.target.value)),
        fetchClearInput: () => dispatch(fetchClearInput()),
        fetchClickedSearchElement:(element) => dispatch(fetchClickedSearchElement(element)),
        fetchAddToFavorites:() => dispatch(fetchAddToFavorites())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);