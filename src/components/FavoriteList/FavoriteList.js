import React from 'react';
import './FavoriteList.css';
import Button from "../UI/Button/Button";
import {NavLink} from "react-router-dom";



const FavoriteList= (props) =>{
    console.log(props);
    return(
            <div className="FavoriteList"   onClick={()=>props.onSelect(props.state.name.city.name)} >
                <NavLink to="/" className="invivsible-url" ><div> </div></NavLink>
                <h1>{props.city}</h1>
                <div className={"FavoriteList-temp"}>
                    <h2>{props.temperature}°</h2>
                    <img src={props.icon}  alt=""/>
                </div>
                <Button
                    typeBtn='delete'
                    onClick={()=>props.onDelete(props.state.id)}

                >
                    <a href="">DELETE</a>
                    <div className="hoverBtn">
                        <p className="hoverText" >ARE YOU SURE?</p>
                    </div>
                </Button>



            </div>

    )
};
export default FavoriteList;