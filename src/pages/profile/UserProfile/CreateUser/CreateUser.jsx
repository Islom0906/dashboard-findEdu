import React, {useRef, useState} from 'react';

import {message, Select} from 'antd';
import {Button, Form, Input, Modal} from 'antd';
import IntlMessages from '@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import {useAuthMethod} from '@crema/utility/AuthHooks';
import {useDispatch, useSelector} from 'react-redux';
import {IS_OPEN_FALSE} from 'shared/constants/ActionTypes';
import axios from 'axios';

const CreateUser = () => {
  const emailRef = useRef();
  const otpEmailRef = useRef();
  const otpRef = useRef();
  const dispatch = useDispatch();
  const {messages} = useIntl();
  const {createUserWithEmailAndPassword} = useAuthMethod();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const response = await axios.post(
        'http://18.221.130.228/auth/otpValidation',
        {
          email: otpEmailRef.current?.state?.value,
          otp: otpRef.current?.state?.value,
        },
      );
      message.success(response.data?.message);
      dispatch({type: IS_OPEN_FALSE});
      setConfirmLoading(false);
      form.resetFields();
      form2.resetFields();
    } catch (error) {
      message.error(error.response?.data?.message);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    dispatch({type: IS_OPEN_FALSE});
  };

  return (
    <div className='signup'>
      <div className='signup-content'>
        <Form
          className='signup-form'
          name='basic'
          initialValues={{remember: true}}
          onFinish={createUserWithEmailAndPassword}
          form={form}>
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
            <Input ref={emailRef} placeholder={messages['common.email']} />
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
            name='role'
            className='form-field'
            rules={[
              {
                required: true,
              },
            ]}>
            <Select
              placeholder='Select role'
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

          <div
            className='form-btn-field'
            style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button type='primary' htmlType='submit' className='signup-btn'>
              <IntlMessages id='userProfile.createUser' />
            </Button>
          </div>
        </Form>
      </div>

      <Modal
        title={messages['common.otpTitle']}
        visible={useSelector((state) => state.modal.isOpen)}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form form={form2}>
          <Form.Item>
            <Input
              value={emailRef?.current?.state?.value}
              placeholder={messages['common.email']}
              ref={otpEmailRef}
            />
          </Form.Item>
          <Form.Item
          name='otp'>
            <Input placeholder={messages['common.otp']} ref={otpRef} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateUser;
