import React from 'react';
import './Button.scss';

const Button = (props) =>{
  const cls=  ['btn',
  props.typeBtn];
  console.log(props);
  return  (
        <button
            onClick={props.onClick}
            className={cls.join(' ')}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};
export default Button;