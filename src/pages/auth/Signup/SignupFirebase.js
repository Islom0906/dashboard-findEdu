import React from 'react';
// import {Link} from 'react-router-dom';
// import {
//   GithubOutlined,
//   GoogleOutlined,
//   TwitterOutlined,
// } from '@ant-design/icons';
// import {Button, Checkbox, Form, Input} from 'antd';
import {Select} from 'antd';
import {Button, Form, Input} from 'antd';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
// import {FaFacebookF} from 'react-icons/fa';
import {useAuthMethod} from '../../../@crema/utility/AuthHooks';


const SignupFirebase = () => {
  const {messages} = useIntl();
  // const {createUserWithEmailAndPassword, signInWithPopup} = useAuthMethod();
  const {createUserWithEmailAndPassword} = useAuthMethod();
  return (
    <div className='signup'>
      <div className='signup-content'>
        <Form
          className='signup-form'
          name='basic'
          initialValues={{remember: true}}
          onFinish={createUserWithEmailAndPassword}>
          <Form.Item
            name='name'
            className='form-field'
            rules={[
              {
                required: true,
                message: <IntlMessages id='validation.nameRequired' />,
              },
            ]}>
            <Input placeholder={messages['common.name']} />
          </Form.Item>

          <Form.Item
            name='email'
            className='form-field'
            rules={[
              {
                required: true,
                message: <IntlMessages id='validation.emailRequired' />,
              },
            ]}>
            <Input placeholder={messages['common.email']} />
          </Form.Item>

          <Form.Item
            name='password'
            className='form-field'
            rules={[
              {
                required: true,
                message: <IntlMessages id='validation.passwordRequired' />,
              },
            ]}>
            <Input.Password placeholder={messages['common.password']} />
          </Form.Item>

          <Form.Item
            name='passwordConfirm'
            className='form-field'
            rules={[
              {
                required: true,
                message: <IntlMessages id='validation.reTypePassword' />,
              },
            ]}>
            <Input.Password placeholder={messages['common.retypePassword']} />
          </Form.Item>

          <Form.Item
            name='role'
            className='form-field'
            rules={[
              {
                required: true,
              },
            ]}>
            <Select
            placeholder="Select role"
              style={{
                width: 120,
              }}
              options={[
                {
                  value: 'user',
                  label: 'User',
                },
                {
                  value: 'admin',
                  label: 'Admin',
                },
              ]}
            />
          </Form.Item>
          {/* 
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
          </Form.Item> */}

          <div
            className='form-btn-field'
            style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button type='primary' htmlType='submit' className='signup-btn'>
              <IntlMessages id='userProfile.createUser' />
            </Button>
          </div>

          {/* <div className='form-field-action'>
            <span className='signup-text-grey'>
              <IntlMessages id='common.alreadyHaveAccount' />
            </span>
            <Link to='/signIn' className='underlineNone colorTextPrimary'>
              <IntlMessages id='common.signIn' />
            </Link>
          </div> */}
        </Form>
      </div>

      {/* <div className='signup-footer'>
        <span className='signup-text signup-text-grey'>
          <IntlMessages id='auth.orSignupWith' />
        </span>

        <div className='signup-socialLink'>
          <Button
            className='signup-icon-btn'
            shape='circle'
            onClick={() => signInWithPopup('google')}
            icon={<GoogleOutlined />}
          />
          <Button
            className='signup-icon-btn'
            shape='circle'
            onClick={() => signInWithPopup('facebook')}
            icon={<FaFacebookF />}
          />
          <Button
            className='signup-icon-btn'
            shape='circle'
            icon={<GithubOutlined />}
            onClick={() => signInWithPopup('github')}
          />
          <Button
            className='signup-icon-btn'
            shape='circle'
            icon={<TwitterOutlined />}
            onClick={() => signInWithPopup('twitter')}
          />
        </div>
      </div> */}
    </div>
  );
};

export default SignupFirebase;
