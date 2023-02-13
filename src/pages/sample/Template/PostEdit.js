import {UploadOutlined} from '@ant-design/icons';
import {Button, Form, Input, Modal, Spin, Upload} from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

function PostEdit({title, loading}) {
  const [form] = Form.useForm();
  const handleSubmit = () => {
    console.log(form.getFieldsValue());
  };
  return (
    <Modal
      onCancel={() => {}}
      onOk={handleSubmit}
      visible={true}
      title={title}
      width={2000}>
      <Spin spinning={loading.modal}>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name='name_En' label='Name (en)'>
            <Input />
          </Form.Item>
          <Form.Item name='name_Uz' label='Name (uz)'>
            <Input />
          </Form.Item>
          <Form.Item name='name_Ru' label='Name (ru)'>
            <Input />
          </Form.Item>
          <Form.Item name='photo' label='Image'>
            <Upload.Dragger
              maxCount={1}
              beforeUpload={(img) => {
                console.log(img);
                return true;
              }}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}

export default PostEdit;

PostEdit.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.object,
};
