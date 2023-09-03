import { LOGIN_SUCCESS, LOGOUT } from "./action"; // Import LOGOUT action type

const initialState = {
  token: null,
  loginData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        loginData: action.payload.loginData,
      };
    case LOGOUT: // Handle the LOGOUT action
      return initialState; // Reset to initial state
    default:
      return state;
  }
};

export default authReducer;
