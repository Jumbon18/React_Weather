import React from 'react'
import './Favorites.css'
import {connect} from "react-redux";
import ActiveWeather from "../../components/ActiveWeather/ActiveWeather";
import {url} from "../../Icon/icon";
import FavoriteList from "../../components/FavoriteList/FavoriteList";
import {fetchDeleteCity, fetchRestartState, fetchToSelectItem} from "../../store/actions/weather";
class Favorites extends React.Component{
    renderFavorites =() =>{

            return this.props.favoritesList.map((item, index) => {
                return (
                    <li
                    key={index}>
                        <FavoriteList
                            state={item}
                            city={item.name.city.name}
                            temperature={item.name.list[0].main.temp}
                            icon={`${url}${item.name.icon}.png`}
                            onDelete={this.props.fetchDeleteCity}
                            onSelect={this.props.fetchToSelectItem}
                        />
                    </li>
                )
            })


        };
    componentDidMount() {
        this.props.fetchRestartState();
    }

    render(){
console.log('RENDER BITHC');
        return (
            <div className='Favorites'>
               <ul>
                   {this.props.favoritesList.length > 0 ?
                       this.renderFavorites() :
                       <h1>NONE</h1>
                   }

               </ul>
               </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        favoritesList:state.weather.favoritesList
    }

}
function mapDispatchToProps(dispatch) {
    return{
        fetchDeleteCity:itemId => dispatch(fetchDeleteCity(itemId)),
        fetchRestartState:()=>dispatch(fetchRestartState()),
        fetchToSelectItem:(query) =>dispatch(fetchToSelectItem(query))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Favorites);