import {
    NEW_ALBUM_REQUEST,
    NEW_ALBUM_SUCCESS,
    NEW_ALBUM_FAIL,
    ALL_ALBUM_REQUEST,
    ALL_ALBUM_SUCCESS,
    ALL_ALBUM_FAIL,
    ALBUM_DETAILS_REQUEST,
    ALBUM_DETAILS_FAIL,
    ALBUM_DETAILS_SUCCESS,
    UPDATE_ALBUM_REQUEST,
    UPDATE_ALBUM_SUCCESS,
    UPDATE_ALBUM_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    DELETE_ALBUM_REQUEST,
    DELETE_ALBUM_SUCCESS,
    DELETE_ALBUM_FAIL,
} from '../actiontypes';
import axios from "axios";

const baseUrl = "https://disecto-app.herokuapp.com"


export const createAlbum = (newData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_ALBUM_REQUEST });
    
        const config = {
            headers: { 
                "Content-Type": "application/json",
                "crossDomain": true
            },
            "withCredentials": true,
        };
    
        const { data } = await axios.post(
            baseUrl + `/api/v1/album/new`,
            newData,
            config
        );
    
        dispatch({
            type: NEW_ALBUM_SUCCESS,
            payload: data,
        });
        dispatch(getAllAlbums());
    } catch (error) {
        dispatch({
            type: NEW_ALBUM_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const getAllAlbums = () => async (dispatch) => {

    try {
        dispatch({ type: ALL_ALBUM_REQUEST });
        const config = {
            headers: { 
                "Content-Type": "application/json"
                ,"crossDomain": true
            },
            "withCredentials": true,
        };

        const { data } = await axios.get(baseUrl + `/api/v1/albums`, config);

        dispatch({
            type: ALL_ALBUM_SUCCESS,
            payload: data,

        })
    } catch (error) {
        dispatch({
            type: ALL_ALBUM_FAIL
        })
    }
};


export const getAlbumDetails = (id) => async (dispatch) => {

    try {
        dispatch({ type: ALBUM_DETAILS_REQUEST });
        const config = {
            headers: { 
                "Content-Type": "application/json"
                ,"crossDomain": true
            },
            "withCredentials": true,
        };

        const { data } = await axios.get(baseUrl + `/api/v1/album/${id}`, config);

        dispatch({
            type: ALBUM_DETAILS_SUCCESS,
            payload: data.album,
        })
    } catch (error) {
        dispatch({
            type: ALBUM_DETAILS_FAIL
        })
    }
} 


export const addImages = (id,newData) => async (dispatch) => {

    try {
        dispatch({ type: UPDATE_ALBUM_REQUEST });
        console.log(newData);
        const config = {
            headers: { 
                "Content-Type": "multipart/form-data"
                ,"crossDomain": true
            },
            "withCredentials": true,
        };
        console.log("updating...", newData);

        const { data } = await axios.post(
            baseUrl + `/api/v1/album/update/${id}`,
            newData,
            config,
        );
        
        console.log("updatied");
        dispatch({
            type: UPDATE_ALBUM_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ALBUM_FAIL
        })
    }
};


export const deleteAlbum = (id) => async (dispatch) => {

    try {
        dispatch({ type: DELETE_ALBUM_REQUEST });
        const config = {
            headers: { 
                "Content-Type": "application/json"
                ,"crossDomain": true
            },
            "withCredentials": true,
        };
        const { data } = await axios.delete(baseUrl + `/api/v1/album/delete/${id}`,config);
    
        dispatch({
            type: DELETE_ALBUM_SUCCESS,
            payload: data.success,
        });
        dispatch(getAllAlbums());
    } catch (error) {
        dispatch({
            type: DELETE_ALBUM_FAIL,
            payload: error.response.data.message,
        });
    }
}; 

export const addReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });
        const config = {
            headers: { 
                "Content-Type": "application/json"
                ,"crossDomain": true
            },
            "withCredentials": true,
        };

        const { data } = await axios.put(baseUrl + `/api/v1/review`, reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        });
        dispatch(getAlbumDetails(reviewData.albumId))
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};