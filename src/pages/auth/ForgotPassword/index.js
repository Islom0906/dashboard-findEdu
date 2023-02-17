import React from 'react';
import './index.style.less';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import AuthWrapper from '../AuthWrapper';
import ForgetPasswordJwtAuth from './ForgetPasswordJwtAuth';

const ForgetPassword = () => {
  return (
    <AuthWrapper type='bottom'>
      <AppPageMetadata title='Forgot Password' />
      <ForgetPasswordJwtAuth />
    </AuthWrapper>
  );
};

export default ForgetPassword;
