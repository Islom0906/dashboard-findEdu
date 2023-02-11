import React from 'react';
import ReactCodeInput from 'react-code-input';
import {Button, Form, Input} from 'antd';
import IntlMessages from '../../@crema/utility/IntlMessages';
import useIntl from 'react-intl/lib/src/components/useIntl';
import './AuthWrapper.style.less';
// import {useDispatch} from 'react-redux';
// import {useHistory, useLocation} from 'react-router-dom';
// import {onSetNewCognitoPassword} from '../../redux/actions';
import AppPageMetadata from '../../@crema/core/AppPageMetadata';
import AuthWrapper from './AuthWrapper';

const ResetPasswordAwsCognito = () => {
  const {messages} = useIntl();
  // const dispatch = useDispatch();
  // const history = useHistory();
  // const location = useLocation();

  // const {email} = location.state;
  // const onFinish = (values) => {
  //   dispatch(
  //     onSetNewCognitoPassword(email, values.pin, values.newPassword, history),
  //   );
  // };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthWrapper>
      <AppPageMetadata title='Reset Password' />

      <div className='auth-recon-content'>
        <Form
          className='reset-form'
          name='basic'
          initialValues={{remember: true}}
          // onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            name='pin'
            className='form-field'
            rules={[{required: true, message: 'Please input your Pin!'}]}>
            <p>
              <IntlMessages id='common.verificationMessage' />
            </p>

            <ReactCodeInput type='password' fields={6} />
          </Form.Item>

          <Form.Item
            name='newPassword'
            className='form-field'
            rules={[
              {required: true, message: 'Please input your New Password!'},
            ]}>
            <Input
              type='password'
              placeholder={messages['common.newPassword']}
            />
          </Form.Item>

          <Form.Item
            name='confirmPassword'
            className='form-field'
            rules={[
              {
                required: true,
                message: 'Please input your Retype Password!',
              },
            ]}>
            <Input
              type='password'
              placeholder={messages['common.retypePassword']}
            />
          </Form.Item>

          <Button type='primary' htmlType='submit' className='reset-btn'>
            <IntlMessages id='common.resetMyPassword' />
          </Button>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default ResetPasswordAwsCognito;
