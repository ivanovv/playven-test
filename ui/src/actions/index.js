import axios from 'axios';  
import { browserHistory } from 'react-router';  
import cookie from 'react-cookie';  
import { AUTH_USER,  
         AUTH_ERROR,
         UNAUTH_USER,
         PROTECTED_TEST } from './types';

const CLIENT_ROOT_URL = 'http://react.ddns.net';
const API_URL = 'http://rails.ddns.net';

//const API_URL = 'http://localhost:3000';
//const CLIENT_ROOT_URL = 'http://localhost:8080';

export function errorHandler(dispatch, error, type) {  
  let errorMessage = '';

  if(error.data.error) {
    errorMessage = error.data.error;
  } else if(error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if(error.status === 401) {
    dispatch({
      type: UNAUTH_USER,
      payload: 'Authentication required. Please login and try again.'
    });
    cookie.remove('token', { path: '/' });
  } else if (error.status === 404){
    dispatch({
      type: AUTH_ERROR,
      payload: 'Invalid email or password.'
    });
  } else if (error.status === 403){
    dispatch({
      type: AUTH_ERROR,
      payload: 'You are not authorized to do this.'
    });
    dispatch({
      type: PROTECTED_TEST,
      payload: 'You are not authorized to do this.'
    });
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}

export function loginUser({ email, password }) {  
  return function(dispatch) {
    axios.post(`${API_URL}/auth/user_token`, {auth: { email, password }})
    .then(response => {
      cookie.save('token', response.data.jwt, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = CLIENT_ROOT_URL + '/dashboard';
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function registerUser({ email, name, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/auth/register`, {user: { email, name, password }})
    .then(response => {
      cookie.save('token', response.data.token, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = CLIENT_ROOT_URL + '/dashboard';
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

export function logoutUser() {  
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });
    window.location.href = CLIENT_ROOT_URL + '/login';
  }
}

export function protectedTest() {  
  return function(dispatch) {
    axios.get(`${API_URL}/protected`, {
      headers: { 'Authorization': cookie.load('token') }
    })
    .then(response => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR)
    });
  }
}

