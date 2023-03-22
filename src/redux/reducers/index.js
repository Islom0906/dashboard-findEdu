import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import Settings from './Setting';
import Common from './Common';
import Auth1 from './Auth1'
import Modal from './ModalISOpen'

const reducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    settings: Settings,
    common: Common,
    auth1: Auth1,
    modal: Modal,
  });
export default reducers;
