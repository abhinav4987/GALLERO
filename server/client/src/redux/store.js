import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import authReducer from './reducer/auth.reducer';
import { newAlbumReducer, AllAlbumsReducer,albumDetailsReducer, albumReducer, newReviewReducer } from './reducer/album.reducer';

const rootReducer = combineReducers({
    user: authReducer,
    newAlbum: newAlbumReducer,
    albums: AllAlbumsReducer,
    albumDetail: albumDetailsReducer,
    album: albumReducer,
    newReview: newReviewReducer,
});



const middleware = [thunk];

let initialState = {
    user: {
        loading: false,
        user: window.sessionStorage.getItem("user") 
                ?JSON.parse(window.sessionStorage.getItem("user"))
                : null,
        isAuthenticated: window.sessionStorage.getItem("user") 
                ? true
                : false  ,
        error: null,
    },
};

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;