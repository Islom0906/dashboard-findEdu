import {IS_OPEN_FALSE, IS_OPEN_TRUE} from '../../shared/constants/ActionTypes';

const INIT_STATE = {
 isOpen: false
};

const modalReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case IS_OPEN_TRUE: {
      return {
        ...state,
        isOpen: true,
      };
    }
    case IS_OPEN_FALSE: {
      return {
        ...state,
        isOpen: false,
      };
    }
    default:
      return state;
  }
};
export default modalReducer;
