import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Checkbox, Button, Form, Input} from 'antd';
import {
  GithubOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import {FaFacebookF} from 'react-icons/fa';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useAuthMethod} from '../../../@crema/utility/AuthHooks';

const SignInFirebase = () => {
  const history = useHistory();
  const {signInWithEmailAndPassword, signInWithPopup} = useAuthMethod();
  const {messages} = useIntl();

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onGoToForgetPassword = () => {
    history.push('/forget-password', {tab: 'firebase'});
  };

  function onRememberMe(e) {
    console.log(`checked = ${e.target.checked}`);
  }

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
          onFinish={signInWithEmailAndPassword}
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
            onClick={() => signInWithPopup('google')}
            icon={<GoogleOutlined />}
          />
          <Button
            className='sign-icon-btn'
            icon={<FaFacebookF />}
            onClick={() => signInWithPopup('facebook')}
          />
          <Button
            className='sign-icon-btn'
            icon={<GithubOutlined />}
            onClick={() => signInWithPopup('github')}
          />
          <Button
            className='sign-icon-btn'
            icon={<TwitterOutlined />}
            onClick={() => signInWithPopup('twitter')}
          />
        </div>
      </div>
    </div>
  );
};

export default SignInFirebase;
