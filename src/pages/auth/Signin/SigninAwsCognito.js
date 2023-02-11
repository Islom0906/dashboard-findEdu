import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useIntl} from 'react-intl';
import {GoogleOutlined} from '@ant-design/icons';
import {Button, Checkbox, Form, Input} from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {FaFacebookF} from 'react-icons/fa';
import {useAuthMethod} from '../../../@crema/utility/AuthHooks';
import {useAwsCognito} from '../../../@crema/services/auth/aws-cognito/AWSAuthProvider';

const SigninAwsCognito = () => {
  const {signIn} = useAuthMethod();
  const {auth} = useAwsCognito();
  const history = useHistory();

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onGoToForgetPassword = () => {
    history.push('/forget-password', {tab: 'awsCognito'});
  };

  function onRememberMe(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  const {messages} = useIntl();

  return (
    <div className='sign'>
      <div className='sign-content'>
        <Form
          className='sign-form'
          name='basic'
          initialValues={{
            remember: true,
            email: 'crema.demo@gmail.com',
            password: 'Pass@1!@all',
          }}
          onFinish={signIn}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            name='email'
            className='form-field'
            rules={[{required: true, message: 'Please input your Email!'}]}>
            <Input placeholder={messages['common.email']} />
          </Form.Item>

          <Form.Item
            name='password'
            className='form-field'
            rules={[{required: true, message: 'Please input your Password!'}]}>
            <Input.Password placeholder={messages['common.password']} />
          </Form.Item>

          <div className='rememberMe'>
            <Checkbox onChange={onRememberMe}>
              <IntlMessages id='common.rememberMe' />
            </Checkbox>

            <span className='sign-link' onClick={onGoToForgetPassword}>
              <IntlMessages id='common.forgetPassword' />
            </span>
          </div>

          <div className='form-btn-field'>
            <Button type='primary' htmlType='submit' className='sign-btn'>
              <IntlMessages id='common.login' />
            </Button>
          </div>

          <div className='form-field-action'>
            <span className='sign-text-grey'>
              <IntlMessages id='common.dontHaveAccount' />
            </span>
            <Link to='/signup' className='underlineNone colorTextPrimary'>
              <IntlMessages id='common.signup' />
            </Link>
          </div>
        </Form>
      </div>

      <div className='sign-footer'>
        <span className='sign-text sign-text-grey'>
          <IntlMessages id='common.orLoginWith' />
        </span>
        <div className='sign-socialLink'>
          <Button
            className='sign-icon-btn'
            icon={<GoogleOutlined />}
            onClick={() => auth.federatedSignIn({provider: 'Google'})}
          />
          <Button
            className='sign-icon-btn'
            icon={<FaFacebookF />}
            onClick={() => auth.federatedSignIn({provider: 'Facebook'})}
          />
        </div>
      </div>
    </div>
  );
};

export default SigninAwsCognito;
