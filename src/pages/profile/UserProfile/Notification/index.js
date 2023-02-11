import React from 'react';
import {Button, Form, Switch} from 'antd';
import PropTypes from 'prop-types';
import '../index.style.less';
import IntlMessages from '../../../../@crema/utility/IntlMessages';

const Notification = ({notification}) => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  return (
    <Form
      className='user-profile-form'
      initialValues={{remember: true}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      <div className='profile-notification'>
        <h3 className='user-profile-form-title'>
          <IntlMessages id='userProfile.activity' />
        </h3>
        <div className='notification-list'>
          {notification.activity.map((activity, index) => {
            return (
              <div key={index} className='notification-list-item'>
                <Switch
                  defaultChecked={activity.defaultChecked}
                  onChange={onChange}
                />
                <label className='label'>{activity.title}</label>
              </div>
            );
          })}
        </div>
      </div>

      <div className='profile-notification'>
        <h3 className='user-profile-form-title'>
          <IntlMessages id='userProfile.application' />
        </h3>
        <div className='notification-list'>
          {notification.application.map((application, index) => {
            return (
              <div key={index} className='notification-list-item'>
                <Switch
                  defaultChecked={application.defaultChecked}
                  onChange={onChange}
                />
                <label className='label'>{application.title}</label>
              </div>
            );
          })}
        </div>
      </div>

      <Form.Item shouldUpdate className='user-profile-group-btn'>
        <Button type='primary' htmlType='submit'>
          Save Changes
        </Button>
        <Button htmlType='cancel'>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default Notification;

Notification.propTypes = {
  notification: PropTypes.object,
};
