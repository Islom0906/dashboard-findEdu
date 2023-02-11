import React, {useEffect} from 'react';
import {message} from 'antd';

import {AppLoader} from '../../../@crema';
import {useDispatch, useSelector} from 'react-redux';
import {hideMessage} from '../../../redux/actions';

const AppInfoView = () => {
  const {loading, error, displayMessage} = useSelector(({common}) => common);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(hideMessage());
    }
  }, [error]);

  useEffect(() => {
    if (displayMessage) {
      message.success(displayMessage);
      dispatch(hideMessage());
    }
  }, [displayMessage]);

  return <>{loading ? <AppLoader /> : null}</>;
};

export default AppInfoView;
