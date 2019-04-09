import React from 'react';
import './Button.css';

const Button = (props) =>{
  const cls=  ['btn',
  props.typeBtn];
  return  (
        <button
            onClick={props.onClick}
            className={cls.join(' ')}
        >
            {props.children}
        </button>
    );
};
export default Button;