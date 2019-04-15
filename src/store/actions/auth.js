import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS, FETCH_ERROR_LOGIN} from "./actionTypes";

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC5AsUJPV9aXsSFPZ8PMdtjwCj6VvFgPNo';
        if (isLogin) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC5AsUJPV9aXsSFPZ8PMdtjwCj6VvFgPNo';

        }
        try{
            const response =  await axios.post(url, authData);
            const data = response.data;
            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);


            localStorage.setItem('token',data.idToken);
            localStorage.setItem('userId',data.localId);
            localStorage.setItem('expirationDate', expirationDate );

            dispatch(authSuccess(data.idToken));
            dispatch(autoLogout(data.expiresIn));
        }
        catch (e) {
           console.log(e);
           dispatch(authErrorLogin());
        }

    }

}

export function authErrorLogin() {
    return {
        type:FETCH_ERROR_LOGIN
    }
}
export function authSuccess(token) {
    return{
        type:AUTH_SUCCESS,
        token
    }
}
export function autoLogout(time) {
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        },time*1000)
    }

}
export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate' );
    return {
        type:AUTH_LOGOUT
    }
}
export function autoLogin() {
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else{
            const exprationDate =new Date( localStorage.getItem('expirationDate'));
            if(exprationDate <= new Date()){
                dispatch(logout());
            }
            else{
                dispatch(authSuccess(token));
                dispatch(autoLogout((exprationDate.getTime() - new Date().getTime()) /1000));
            }
        }
    }
}