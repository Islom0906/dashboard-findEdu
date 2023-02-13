import {UploadOutlined} from '@ant-design/icons';
import {Button, Form, Input, message, Modal, Spin, Upload} from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';

axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGUxYmU1MjNiNWZhYmM1YjUxYjc5ZCIsImlhdCI6MTY3NTYwNTUyMywiZXhwIjoxNjgzMzgxNTIzfQ.pEUX_SAIUZ2qjmPLpKz4TvXCOuyln_O84hXyNWQpn_c';

function PostEdit({
  title,
  loading,
  setLoading,
  visible,
  setVisible,
  page,
  getItems,
  editItem,
  setEditItem,
}) {
  const style = {
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    background: `url(http://18.216.178.179/api/v1/img/${editItem.photo})`,
  };
  const [form] = Form.useForm();
  // console.log(editItem);
  // const [photo,setPhoto] = useState()
  useEffect(() => {
    form.setFieldsValue(editItem);
  }, [editItem]);

  const postItem = (data) => {
    const formData = new FormData();
    data.name_Uz && formData.append('name_Uz', data.name_Uz);
    data.name_Ru && formData.append('name_Ru', data.name_Ru);
    data.name_En && formData.append('name_En', data.name_En);
    data.photo?.['file'] && formData.append('photo', data.photo['file']);

    setLoading((prev) => {
      return {...prev, modal: true};
    });
    axios[editItem._id ? 'patch' : 'post'](
      `http://18.216.178.179/api/v1/${page}/${editItem._id || ''}`,
      formData,
    )
      .finally(() => {
        setLoading((prev) => {
          return {...prev, modal: false};
        });
      })
      .then(() => {
        message.success('Succesfuly posted', 2);
        editItem._id && setVisible(false);
        setEditItem({});
        form.resetFields();
        getItems();
      })
      .catch((err) => {
        message.error(err.message, 3);
      });
  };
  const handleSubmit = () => {
    postItem(form.getFieldsValue());
  };
  return (
    <Modal
      onCancel={() => {
        setVisible(false);
        setEditItem({});
        editItem._id && form.resetFields();
      }}
      onOk={form.submit}
      okText='Submit'
      visible={visible}
      style={{top: 50}}
      title={title}
      width={500}>
      <Spin spinning={loading.modal}>
        <Form
          form={form}
          onFinish={handleSubmit}
          labelCol={{span: 5}}
          // wrapperCol={{span: 16}}
        >
          <Form.Item
            name='name_En'
            label='Name (en)'
            rules={[
              {required: true, message: 'Please enter the name in English'},
            ]}
            hasFeedback>
            <Input />
          </Form.Item>
          <Form.Item
            name='name_Uz'
            label='Name (uz)'
            rules={[
              {required: true, message: 'Please enter the name in Uzbek'},
            ]}
            hasFeedback>
            <Input />
          </Form.Item>
          <Form.Item
            name='name_Ru'
            label='Name (ru)'
            rules={[
              {required: true, message: 'Please enter the name in Russian'},
            ]}
            hasFeedback>
            <Input />
          </Form.Item>
          <Form.Item name='photo'>
            <Upload.Dragger
              style={style}
              listType='picture'
              maxCount={1}
              accept='image/png, image/jpeg, image/jfif, image/svg'
              height={200}
              percent={1}
              beforeUpload={() => false}>
              {editItem.photo ? (
                ''
              ) : (
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              )}
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
  page: PropTypes.string,
  loading: PropTypes.object,
  editItem: PropTypes.object,
  visible: PropTypes.bool,
  setVisible: PropTypes.func,
  setLoading: PropTypes.func,
  setEditItem: PropTypes.func,
  getItems: PropTypes.func,
};
