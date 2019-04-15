import {AUTH_LOGOUT, AUTH_SUCCESS, FETCH_ERROR_LOGIN} from "../actions/actionTypes";

const initialState = {
    token: null,
    test:'asdssa'

};
export  default function authReducer (state  = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS :
            return {
                ...state,token:action.token
            };
        case AUTH_LOGOUT:
            return {
                ...state,token:null
            };
        case FETCH_ERROR_LOGIN:
            return{
                ...state,token:false
            };
        default:
            return state;
    }

}