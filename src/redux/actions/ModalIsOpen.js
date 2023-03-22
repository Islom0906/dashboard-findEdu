import { IS_OPEN_FALSE, IS_OPEN_TRUE } from "shared/constants/ActionTypes";

export const is_open_true = () =>{
    return (dispatch) => dispatch({type: IS_OPEN_TRUE});
  }
  
  export const is_opsn_false = () =>{
    return (dispatch) => dispatch({type: IS_OPEN_FALSE});
  }