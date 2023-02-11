import React from 'react';
import {Button, Col, Form, Input} from 'antd';
import AppRowContainer from '../../../../@crema/core/AppRowContainer';
import ProfileConnection from './ProfileConnection';
import PropTypes from 'prop-types';
import IntlMessages from '../../../../@crema/utility/IntlMessages';

const SocialLink = ({socialLink}) => {
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
        <IntlMessages id='userProfile.socialLink' />
      </h3>
      <AppRowContainer gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name='twitter'
            rules={[
              {required: true, message: 'Please Enter your Twitter url'},
            ]}>
            <Input placeholder='Twitter' />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name='facebook'
            rules={[
              {required: true, message: 'Please Enter your Facebook url'},
            ]}>
            <Input placeholder='Facebook' />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name='google'
            rules={[{required: true, message: 'Please Enter your Google url'}]}>
            <Input placeholder='Google' />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name='linkedIn'
            rules={[
              {required: true, message: 'Please Enter your LinkedIn url'},
            ]}>
            <Input placeholder='LinkedIn' />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name='instagram'
            rules={[
              {required: true, message: 'Please Enter your Instagram url'},
            ]}>
            <Input placeholder='Instagram' />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name='quora'
            rules={[{required: true, message: 'Please Enter your Quora url'}]}>
            <Input placeholder='Quora' />
          </Form.Item>
        </Col>
      </AppRowContainer>

      <ProfileConnection profileConnection={socialLink} />

      <Form.Item shouldUpdate className='user-profile-group-btn'>
        <Button type='primary' htmlType='submit'>
          Save Changes
        </Button>
        <Button htmlType='cancel'>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default SocialLink;

SocialLink.propTypes = {
  socialLink: PropTypes.array,
};
