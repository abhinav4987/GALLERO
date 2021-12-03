import {
    NEW_ALBUM_REQUEST,
    NEW_ALBUM_SUCCESS,
    NEW_ALBUM_FAIL,
    CLEAR_ERROR,
    ALL_ALBUM_REQUEST,
    ALL_ALBUM_SUCCESS,
    ALL_ALBUM_FAIL,
    ALBUM_DETAILS_REQUEST,
    ALBUM_DETAILS_FAIL,
    ALBUM_DETAILS_SUCCESS,
    UPDATE_ALBUM_REQUEST,
    UPDATE_ALBUM_SUCCESS,
    UPDATE_ALBUM_FAIL,
    DELETE_ALBUM_REQUEST,
    DELETE_ALBUM_SUCCESS,
    DELETE_ALBUM_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
} from '../actiontypes'


export const newAlbumReducer = (state = { newAlbum: {} }, action) => {
    switch (action.type) {
        case NEW_ALBUM_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_ALBUM_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                newAlbum: action.payload.album,
            };
        case NEW_ALBUM_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const AllAlbumsReducer = (state = { albums: [], loading: false}, action) => {
    switch (action.type) {
        case ALL_ALBUM_REQUEST:
            return {
                loading: true,
                alums: [],
            }
        case ALL_ALBUM_SUCCESS:
            return {
                loading: false,
                albums: action.payload.albums,
                totalAlbums: action.payload.albumsCount,
            }
        case ALL_ALBUM_FAIL:
            return {
                loading: false,
                albums: [],
                totalAlbums: 0,
                error: action.payload,
            }
        default:
            return state;
    }
}

export const albumDetailsReducer = (state = { album: {} }, action) => {
    
    switch (action.type) {
        case ALBUM_DETAILS_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case ALBUM_DETAILS_SUCCESS:
            return {
                loading: false,
                album: action.payload,
            }
        case ALBUM_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
    
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }

};

export const albumReducer = (state={}, action) => {

    switch (action.type) {
        case DELETE_ALBUM_REQUEST:
        case UPDATE_ALBUM_REQUEST:
        return {
            ...state,
            loading: true,
        };
        case DELETE_ALBUM_SUCCESS:
        return {
            ...state,
            loading: false,
            isDeleted: action.payload,
        };

        case UPDATE_ALBUM_SUCCESS:
        return {
            ...state,
            loading: false,
            isUpdated: action.payload,
        };
        case DELETE_ALBUM_FAIL:
        case UPDATE_ALBUM_FAIL:
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
        case CLEAR_ERROR:
        return {
            ...state,
            error: null,
        };
        default:
        return state;
    }
};

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            };
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};