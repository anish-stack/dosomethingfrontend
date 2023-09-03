import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS } from "../constants/userConstant"

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading: true,
                isAuthenticatedUser: false,
            };
        case LOGIN_SUCCESS: 
            return {
                ...state,
                loading: false, 
                isAuthenticatedUser: true,
                user: action.payload,
            };
        case LOGIN_FAIL:
            return {
                loading: false,
                isAuthenticatedUser: false,
                user:null,
                error: action.payload,
            };
        default:
            return state;
    }
};
