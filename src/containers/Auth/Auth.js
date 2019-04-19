import React from 'react';
import './Auth.css';
import is from 'is_js';
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

class Auth extends React.Component{
    _isMounted = false;
    state = {
        errorAuth: false,
        isFormValid: false,
        formControl: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                placeholder: 'Enter your email',
                errorMessage: 'Enter the proper email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                placeholder: 'Enter your password',
                errorMessage: 'Enter the proper password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    };

    loginHandler =  async() => {
        this._isMounted = true;
      try {
          await this.props.auth(
              this.state.formControl.email.value,
              this.state.formControl.password.value,
              true);
          console.log(this.props.isAuthenticated);
          if (this._isMounted) {
              if (!this.props.isAuthenticated) {
                  this.setState({
                      errorAuth: true
                  });
              }
          }
      }
      catch (e) {
      console.log(e);
      }



    };
componentWillUnmount() {
    this._isMounted=false;
}

    registerHandler =  () => {
        this.props.auth(this.state.formControl.email.value,
            this.state.formControl.password.value,
            false);

    };

    submitHandler = event => {
        event.preventDefault();
    };

    validateControl(value, validation) {
        if (!validation) {
            return true;
        }
        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = is.email(value) && isValid;
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid;
    }

    onChangeHandler = (event, controlName) => {

        const formControl = {...this.state.formControl};
        const control = {...formControl[controlName]};
        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);
        formControl[controlName] = control;
        let isFormValid = true;
        Object.keys(formControl).forEach(name => {
            isFormValid = formControl[name].valid && isFormValid;

        });

        this.setState({
            formControl, isFormValid
        })

    };

    renderInputs() {
        return Object.keys(this.state.formControl).map((controlName, index) => {
            const control = this.state.formControl[controlName];
            return (
                <Input
                    errorAuth={this.state.errorAuth}
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    placeholder={control.placeholder}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={(event) => this.onChangeHandler(event, controlName)}
                />

            )
        });
    }

    render() {
        console.log(this.state,this.props.token,this.props.test);
        return (
            <div className={'Auth'}>
                <div>
                    <h1>Login</h1>

                    <form onSubmit={this.submitHandler} className={'AuthForm'}>

                       <div>{this.renderInputs()}</div>
                        <Button typeBtn="login-btn auth-btn" disabled={!this.state.isFormValid}
                                onClick={this.loginHandler}>Log in</Button>
                        <Button typeBtn="sign-btn auth-btn" disabled={!this.state.isFormValid} onClick={this.registerHandler}>Sign in</Button>
                        </form>
                </div>
            </div>
        )
    }
};

function mapStateToProps(state) {
    return {
        isAuthenticated:state.auth.token,


    }
}
function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);