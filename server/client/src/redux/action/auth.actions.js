import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
} from '../actiontypes';
import axios from "axios";

const baseUrl = "https://disecto-app.herokuapp.com";


export const login = (email, password) => async (dispatch, getState) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        })

        const config = {
            headers: { 
                "Content-Type": "application/json"
                ,"crossDomain": true
            },
            "withCredentials": true,
        };

        const response = await axios.post(
            baseUrl + `/api/v1/login`,
            { email, password },
            config
        );
        console.log(response);
        dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
        window.sessionStorage.setItem("user", JSON.stringify(getState().user.user));
    } catch (error) {
        if(error)
        dispatch({ type: LOGIN_FAIL, payload: error?.response?.data?.message });
    }
}

export const registerUser = (name, email, password) => async (dispatch, getState) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        const config = {
            headers: { 
                "Content-Type": "application/json"
                ,"crossDomain": true
            },
            "withCredentials": true,
        };

        const { data } = await axios.post(baseUrl + `/api/v1/register`, {
            name,
            email,
            password,
        }, config);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
        window.sessionStorage.setItem("user", JSON.stringify(getState().user.user));
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
}


export const logout = () => async (dispatch,getState) => {
    try {
        await axios.get(baseUrl +  `/api/v1/logout`);
        dispatch({ type: LOGOUT_SUCCESS });
        window.sessionStorage.removeItem("user");
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};