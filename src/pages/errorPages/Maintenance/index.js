import React from 'react';
import {useHistory} from 'react-router-dom';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppAnimateGroup from '../../../@crema/core/AppAnimateGroup';
import {Button} from 'antd';
import '../index.style.less';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import {ReactComponent as Logo} from '../../../assets/icon/maintenance.svg';

const Maintenance = () => {
  const history = useHistory();

  const onGoBackToHome = () => {
    history.goBack();
  };

  return (
    <AppAnimateGroup type='bottom'>
      <AppPageMetadata title='Maintenance' />
      <div className='error-container' key='a'>
        <div className='error-img-lg'>
          <Logo />
        </div>
        <div className='error-content error-content-lg'>
          <h3>
            <IntlMessages id='error.mantainanceMessage1' />
          </h3>
          <div className='error-para'>
            <p className='mb-0'>
              <IntlMessages id='error.mantainanceMessage2' />
            </p>
            <p className='mb-0'>
              <IntlMessages id='error.mantainanceMessage3' />.
            </p>
          </div>
          <Button type='primary' className='error-btn' onClick={onGoBackToHome}>
            <IntlMessages id='error.takeMeToHome' />
          </Button>
        </div>
      </div>
    </AppAnimateGroup>
  );
};

export default Maintenance;
