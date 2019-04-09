import React from 'react';
import  './Loader.css';
const Loader = props =>{
    return(
        <div className="center">
            <div className="lds-roller">
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    )
};
export default Loader;