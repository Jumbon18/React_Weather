import React from 'react';
import './FavoriteList.css';
import Button from "../UI/Button/Button";

const FavoriteList= (props) =>{
    return(
        <div>

            <div className="FavoriteList">
                <h1>{props.city}</h1>
                <div className={"FavoriteList-temp"}>
                    <h2>{props.temperature}°</h2>
                    <img src={props.icon}  alt=""/>
                </div>
                <Button
                    typeBtn='delete'
                >
                    <a href="">DELETE</a>
                    <div className="hoverBtn">
                        <p className="hoverText">ARE YOU SURE?</p>
                    </div>
                </Button>
            </div>
        </div>
    )
};
export default FavoriteList;