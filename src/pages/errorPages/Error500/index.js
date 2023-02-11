import React from 'react';
import {useHistory} from 'react-router-dom';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppAnimateGroup from '../../../@crema/core/AppAnimateGroup';
import {Button} from 'antd';
import '../index.style.less';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import {ReactComponent as Logo} from '../../../assets/icon/500.svg';

const Error500 = () => {
  const history = useHistory();

  const onGoBackToHome = () => {
    history.goBack();
  };

  return (
    <AppAnimateGroup type='bottom'>
      <AppPageMetadata title='Server Error' />
      <div className='error-container' key='a'>
        <div className='error-img'>
          <Logo />
        </div>
        <div className='error-content'>
          <h3>
            <IntlMessages id='error.500Error' />.
          </h3>
          <div className='error-para'>
            <p className='mb-0'>
              <IntlMessages id='error.500Message1' />
            </p>
            <p className='mb-0'>
              <IntlMessages id='error.500Message2' />
            </p>
          </div>
          <Button type='primary' className='error-btn' onClick={onGoBackToHome}>
            <IntlMessages id='error.goBackToHome' />
          </Button>
        </div>
      </div>
    </AppAnimateGroup>
  );
};

export default Error500;
