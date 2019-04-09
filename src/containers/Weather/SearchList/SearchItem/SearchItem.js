import React from 'react';
import './SearchItem.css';
const SearchItem = props =>{
    const cls =['SearchItem'];
    if(props.state){
        cls.push(props.state);
    }
    console.log("ITEM",props);
    return (
        <li className={cls.join(' ')}
            onClick={() => props.onClick(props.element)}
           >
            {props.children}
        </li>
    )
};
export default SearchItem;
