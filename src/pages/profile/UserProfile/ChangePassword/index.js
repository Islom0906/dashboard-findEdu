import React from 'react';
import {Button, Col, Form, Input} from 'antd';
import {AppRowContainer} from '../../../../@crema';
import IntlMessages from '../../../../@crema/utility/IntlMessages';

const ChangePassword = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      className='user-profile-form'
      initialValues={{remember: true}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      <h3 className='user-profile-form-title'>
        <IntlMessages id='userProfile.changePassword' />
      </h3>
      <AppRowContainer gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name='oldPassword'
            rules={[
              {required: true, message: 'Please input your Enter Password'},
            ]}>
            <Input.Password placeholder='Enter password' />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} />
        <Col xs={24} md={12}>
          <Form.Item
            name='password'
            rules={[
              {required: true, message: 'Please input your New Password!'},
            ]}>
            <Input.Password placeholder='Enter new password' />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name='confirmPassword'
            rules={[
              {required: true, message: 'Please input Your Confirm Password!'},
              ({getFieldValue}) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    'The Confirm Password that you entered do not match!',
                  );
                },
              }),
            ]}>
            <Input.Password placeholder='Confirm new password' />
          </Form.Item>
        </Col>
        <Col xs={24} md={24}>
          <Form.Item shouldUpdate className='user-profile-group-btn'>
            <Button type='primary' htmlType='submit'>
              Save Changes
            </Button>
            <Button htmlType='cancel'>Cancel</Button>
          </Form.Item>
        </Col>
      </AppRowContainer>
    </Form>
  );
};

export default ChangePassword;
