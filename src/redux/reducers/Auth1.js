import {LOGIN, LOGOUT} from '../../shared/constants/ActionTypes';

const INIT_STATE = {
 isAuth: false
};

const commonReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        isAuth: true,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isAuth: false,
      };
    }
    default:
      return state;
  }
};
export default commonReducer;
