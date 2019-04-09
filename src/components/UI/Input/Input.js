import React from 'react';
import './Input.css';
const Input = props =>{
console.log("INPUT",props);
    const inputType = props.type || 'text';
    const cls = ['Input',
    props.styleInput];
    const htmlFor = `${inputType}-${Math.random()}`;
console.log("INPUT PROPS",props);
    return (

                <div >
                    <label htmlFor={htmlFor}>{props.label}</label>
                    <input className={cls.join(' ')}
                        type={inputType}
                           id={htmlFor}
                           value={props.value}
                           onChange={props.onChange}
                           placeholder={props.placeholder}

                    />
                </div>




            );
};
export default Input;