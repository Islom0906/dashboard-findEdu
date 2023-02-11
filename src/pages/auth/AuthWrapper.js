import React from 'react';
import PropTypes from 'prop-types';
import {Card} from 'antd';
import AppAnimateGroup from '../../@crema/core/AppAnimateGroup';
import './AuthWrapper.style.less';
import {AppInfoView} from '../../@crema';
import AppLogo from '../../@crema/core/AppLayout/components/AppLogo';

const AuthWrapper = ({children}) => {
  return (
    <AppAnimateGroup
      type='scale'
      animateStyle={{flex: 1}}
      delay={0}
      interval={10}
      duration={200}>
      <div className='auth-wrap' key={'wrap'}>
        <Card className='auth-card'>
          <div className='auth-main-content'>
            <div className='auth-card-header'>
              <AppLogo />
            </div>
            {children}
          </div>
          <div className='auth-wel-action'>
            <div className='auth-wel-content'>
              <h2>Welcome to Crema!</h2>
              <p>
                Crema is purely based on Ant Design components and follows Ant
                Design guidelines.
              </p>
            </div>
          </div>
        </Card>
      </div>
      <AppInfoView />
    </AppAnimateGroup>
  );
};

export default AuthWrapper;

AuthWrapper.propTypes = {
  children: PropTypes.node,
};
