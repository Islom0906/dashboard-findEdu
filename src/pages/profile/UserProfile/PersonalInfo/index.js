import React, {useState} from 'react';
import {Avatar, Form, Col, Input, Button} from 'antd';
import {AppRowContainer} from '../../../../@crema';
import {useDropzone} from 'react-dropzone';
import {useAuthUser} from '../../../../@crema/utility/AuthHooks';
import './index.style.less';

const PersonalInfo = () => {
  const {user} = useAuthUser();

  const [userImage, setUserImage] = useState('/assets/images/placeholder.jpg');

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setUserImage(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const onReset = () => {
    setUserImage('/assets/images/placeholder.jpg');
  };

  const onFinish = (values) => {
    console.log('Finish:', values);
  };

  return (
    <Form
      onFinish={onFinish}
      initialValues={{
        ...user,
        userImage: user.photoURL
          ? user.photoURL
          : '/assets/images/placeholder.jpg',
      }}>
      <Form.Item className='info-upload'>
        <Avatar className='info-upload-avatar' src={userImage} />

        <div className='info-upload-content'>
          <div className='info-upload-btn-group'>
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <label htmlFor='icon-button-file'>
                <Button type='primary'>Upload</Button>
              </label>
            </div>
            <Button onClick={onReset}>Reset</Button>
          </div>
          <p>Allowed JPG, GIF or PNG. Max size of 800kB</p>
        </div>
      </Form.Item>
      <AppRowContainer gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name='displayName'
            rules={[{required: true, message: 'Please input your Full Name!'}]}>
            <Input placeholder='Full Name' />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name='email'
            rules={[
              {required: true, message: 'Please input your e-mail address!'},
            ]}>
            <Input type='text' placeholder='E-mail' />
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

export default PersonalInfo;
