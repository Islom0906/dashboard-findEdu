import React from 'react';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AppAnimateGroup from '../../../@crema/core/AppAnimateGroup';
import {Button, Form, Input} from 'antd';
import {useIntl} from 'react-intl';
import '../index.style.less';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import {ReactComponent as Logo} from '../../../assets/icon/comingsoon.svg';

const ComingSoon = () => {
  const {messages} = useIntl();
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AppAnimateGroup type='bottom'>
      <AppPageMetadata title='Coming Soon' />
      <div className='error-container' key='coming_soon'>
        <div className='error-img-lg'>
          <Logo />
        </div>
        <div>
          <div className='error-content'>
            <h3>
              <IntlMessages id='error.comingSoon' />!
            </h3>
            <div className='error-para'>
              <p className='mb-0'>
                <IntlMessages id='error.comingSoonMessage1' />
              </p>
              <p className='mb-0'>
                <IntlMessages id='error.comingSoonMessage2' />
              </p>
            </div>
          </div>
          <div className='error-form-coming'>
            <Form
              className='error-form'
              name='basic'
              initialValues={{remember: true}}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}>
              <Form.Item
                name='email'
                className='form-field'
                rules={[
                  {required: true, message: 'Please enter Email Address!'},
                ]}>
                <Input placeholder={messages['common.emailAddress']} />
              </Form.Item>

              <Button type='primary' className='error-btn' htmlType='submit'>
                <IntlMessages id='error.notifyMe' />
              </Button>
            </Form>
          </div>
        </div>
        {/*<AppInfoView />*/}
      </div>
    </AppAnimateGroup>
  );
};

export default ComingSoon;
