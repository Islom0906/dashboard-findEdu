import {LOGIN, LOGOUT} from '../../shared/constants/ActionTypes';

export const login = () =>{
    return (dispatch) => dispatch({type: LOGIN});
  }
  
  export const logout = () =>{
    return (dispatch) => dispatch({type: LOGOUT});
  }