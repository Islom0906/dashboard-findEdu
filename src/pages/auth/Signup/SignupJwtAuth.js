import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Checkbox, Form, Input} from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import {useAuthMethod} from '../../../@crema/utility/AuthHooks';

const SignupJwtAuth = () => {
  const {messages} = useIntl();
  const {signUpUser} = useAuthMethod();

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='signup'>
      <div className='signup-content'>
        <Form
          className='signup-form'
          name='basic'
          initialValues={{remember: true}}
          onFinish={signUpUser}
          onFinishFailed={onFinishFailed}>
          <Form.Item
            name='name'
            className='form-field'
            rules={[{required: true, message: 'Please input your Name!'}]}>
            <Input placeholder={messages['common.name']} />
          </Form.Item>

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
          <Form.Item
            name='confirmPassword'
            className='form-field'
            rules={[
              {
                required: true,
                message: 'Please input your Retype Password!',
              },
            ]}>
            <Input.Password placeholder={messages['common.retypePassword']} />
          </Form.Item>

          <Form.Item
            className='form-field signup-checkbox'
            name='iAgreeTo'
            valuePropName='checked'>
            <Checkbox>
              <IntlMessages id='common.iAgreeTo' />
            </Checkbox>
            <span className='signup-link'>
              <IntlMessages id='common.termConditions' />
            </span>
          </Form.Item>

          <div className='form-btn-field'>
            <Button type='primary' htmlType='submit' className='signup-btn'>
              <IntlMessages id='common.signup' />
            </Button>
          </div>

          <div className='form-field-action'>
            <span className='signup-text-grey'>
              <IntlMessages id='common.alreadyHaveAccount' />
            </span>
            <Link to='/signIn' className='underlineNone colorTextPrimary'>
              <IntlMessages id='common.signIn' />
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignupJwtAuth;
