// redux/actions.js
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const loginSuccess = (token, loginData) => ({
  type: LOGIN_SUCCESS,
  payload: { token, loginData },
});


// authActions.js
export const LOGOUT = "LOGOUT";

export const logout = () => ({
  type: LOGOUT,
});
