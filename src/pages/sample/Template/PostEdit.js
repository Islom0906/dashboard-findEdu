import {UploadOutlined} from '@ant-design/icons';
import IntlMessages from '@crema/utility/IntlMessages';
import {Button, Form, Input, message, Modal, Spin, Upload} from 'antd';
import ImgCrop from 'antd-img-crop';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import apiService from 'service/api';
import {setLoading, setVisible} from './ReducerActions';

function PostEdit({title, page, state, getItems, dispatch}) {
  // STATES
  const [editItem, setEditItem] = useState({});
  const [photo, setPhoto] = useState();
  const [src, setSrc] = useState();
  const [form] = Form.useForm();
  //USEEFFECTS
  console.log(editItem);

  useEffect(async () => {
    if (!photo || !photo.fileList.length) return setSrc();

    let src = photo.file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(photo.file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    setSrc(src);
  }, [photo]);

  useEffect(() => {
    form.setFieldsValue(editItem);
  }, [editItem]);

  //FETCH requests
  useEffect(() => {
    form.resetFields();
    if (!state.editItemId) {
      setEditItem({});
      return setSrc('');
    }
    dispatch(setLoading({...state.loading, modal: true}));

    apiService.getDataByID(`/${page}`, state.editItemId).then((res) => {
      dispatch(setLoading({...state.loading, modal: false}));

      setEditItem(res.data);
      setSrc(`http://18.216.178.179/api/v1/img/${res.data.photo}`);
    });
  }, [state.editItemId]);

  const postItem = (data) => {
    const formData = new FormData();
    data.name_Uz && formData.append('name_Uz', data.name_Uz);
    data.name_Ru && formData.append('name_Ru', data.name_Ru);
    data.name_En && formData.append('name_En', data.name_En);
    photo?.fileList?.length &&
      formData.append('photo', photo['file'].originFileObj);
    dispatch(setLoading({...state.loading, modal: true}));

    apiService[editItem._id ? 'editData' : 'postData'](
      `/${page}`,
      formData,
      editItem._id,
    )
      .finally(() => {
        dispatch(setLoading({...state.loading, modal: false}));
      })
      .then(() => {
        message.success('Succesfuly posted', 2);
        if (!editItem._id) {
          form.resetFields();
          setPhoto();
          setSrc();
        }
        dispatch(setVisible(false));
        getItems();
      })
      .catch((err) => {
        message.error(err.message, 3);
      });
  };

  // Handlers
  const handleSubmit = () => {
    postItem(form.getFieldsValue());
  };

  //UPLOAD DRAGGER FUNCTIONS
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(photo.file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onChange = (photo) => {
    photo.fileList.forEach((el) => (el.status = 'done'));

    setPhoto(photo);
  };

  const onRemove = () => {};

  return (
    <Modal
      onCancel={() => {
        dispatch(setVisible(false));
      }}
      onOk={form.submit}
      okText={<IntlMessages id='common.submit' />}
      visible={state.visible}
      style={{top: 50}}
      title={title}
      width={600}>
      <Spin spinning={state.loading.modal}>
        <Form
          form={form}
          onFinish={handleSubmit}
          labelCol={{span: 5}}
          // wrapperCol={{span: 16}}
        >
          <Form.Item
            name='name_En'
            label={<IntlMessages id='common.nameEn' />}
            rules={[
              {
                required: true,
                message: <IntlMessages id='common.enterNameRu' />,
              },
            ]}
            hasFeedback>
            <Input />
          </Form.Item>
          <Form.Item
            name='name_Uz'
            label={<IntlMessages id='common.nameUz' />}
            rules={[
              {
                required: true,
                message: <IntlMessages id='common.enterNameRu' />,
              },
            ]}
            hasFeedback>
            <Input />
          </Form.Item>
          <Form.Item
            name='name_Ru'
            label={<IntlMessages id='common.nameRu' />}
            rules={[
              {
                required: true,
                message: <IntlMessages id='common.enterNameRu' />,
              },
            ]}
            hasFeedback>
            <Input />
          </Form.Item>
          <Form.Item
            name='photo'
            rules={[
              {
                validator: () => {
                  if (state.editItemId || photo?.fileList.length)
                    return Promise.resolve();

                  return Promise.reject(
                    <IntlMessages id='common.uploadImage' />,
                  );
                },
              },
            ]}>
            <ImgCrop rotate>
              <Upload.Dragger
                listType='picture'
                maxCount={1}
                accept='image/png, image/jpeg, image/jfif, image/svg'
                height={200}
                // beforeUpload={() => false}
                onRemove={onRemove}
                onPreview={onPreview}
                onChange={onChange}>
                {src ? (
                  <img
                    src={src}
                    alt=''
                    style={{
                      height: '150px',
                    }}
                  />
                ) : (
                  <Button icon={<UploadOutlined />}>
                    <IntlMessages id='common.clickToUpload' />
                  </Button>
                )}
              </Upload.Dragger>
            </ImgCrop>
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
  dispatch: PropTypes.func,
  getItems: PropTypes.func,
  state: PropTypes.object,
};
