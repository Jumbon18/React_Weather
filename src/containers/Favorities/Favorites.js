import React from 'react'
import './Favorites.css'
import {connect} from "react-redux";
import ActiveWeather from "../../components/ActiveWeather/ActiveWeather";
import {url} from "../../Icon/icon";
import FavoriteList from "../../components/FavoriteList/FavoriteList";
class Favorites extends React.Component{
    renderFavorites =() =>{
        if(localStorage.getItem('FAVORITES')) {
            return JSON.parse(localStorage.getItem('FAVORITES')).map((item, index) => {
                return (
                    <li
                    key={index}>
                        <FavoriteList
                            city={item.city.name}
                            temperature={item.list[0].main.temp}
                            icon={`${url}${item.icon}.png`}
                        />
                    </li>
                )
            })
        }
        else{
            return(
                <h1>NONE</h1>
            )

        }
        };
    render(){

        return (
            <div className='Favorites'>
               <ul>
                {this.renderFavorites()}
               </ul>
               </div>
        )
    }
}
function mapStateToProps(state) {
    return {

    }

}
function mapDispatchToProps(dispatch) {
    return{

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Favorites);