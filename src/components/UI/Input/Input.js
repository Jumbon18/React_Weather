import React from 'react';
import './Input.css';

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched

}
const Input = props =>{
console.log("INPUT",props);
    const inputType = props.type || 'text';
    const cls = ['Input'];
    if(isInvalid(props)){
        cls.push('invalid')
    }
    else{
        cls.push(props.styleInput);
    }
    const htmlFor = `${inputType}-${Math.random()}`;
console.log("INPUT PROPS",props);
    return (

                <div className={cls.join(' ')} >
                    <label htmlFor={htmlFor}>{props.label}</label>
                    <input
                        type={inputType}
                           id={htmlFor}
                           value={props.value}
                           onChange={props.onChange}
                           placeholder={props.placeholder}

                    />
                    {
                        props.errorAuth ?
                            <div className="errorAuth"> Неправильный логин или пароль</div>
                            : null
                    }
                    {isInvalid(props)
                        ?
                        <span>{props.errorMessage || 'Введите верное значение'}</span>

                        : null}

                </div>
    );

};
export default Input;