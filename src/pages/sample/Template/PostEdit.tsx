import {UploadOutlined} from '@ant-design/icons';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Button, Form, Input, message, Modal, Spin, Upload} from 'antd';
import ImgCrop from 'antd-img-crop';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {setLoading, setVisible} from './ReducerActions';
import {itemType, photoType, PostEditPropType} from '../Types';
import {UploadFile} from 'antd/lib/upload/interface';
import apiService from 'service/api';
import scss from '../main.module.scss'
import axios from 'axios';


function loadImage(photo: any): any {
  return new Promise((resolve) => {
    const reader = new FileReader();
    photo && reader.readAsDataURL(photo);
    reader.onload = () => {
      console.log(reader.result);

      resolve(reader.result);
    };
  });
}

function PostEdit({page, state, getItems, dispatch}: PostEditPropType) {
  // STATES

  const [editItem, setEditItem] = useState<itemType | null>(null);
  const [photo, setPhoto] = useState<photoType>();
  const [src, setSrc] = useState<string>();
  const [image, setImage] = useState<string>('')
  const [form] = Form.useForm();
  //USEEFFECTS

  useEffect(() => {
    (async function () {
      if (!photo || !photo.fileList.length) return setSrc('');

      let src = photo.file.url;
      if (!src) {
        src = await loadImage(photo.file.originFileObj);
      }
      setSrc(src);
    })();
  }, [photo]);

  useEffect(() => {
    form.setFieldsValue(editItem);
  }, [editItem]);

  //FETCH requests
  useEffect(() => {
    form.resetFields();
    if (!state.editItemId) {
      setEditItem(null);
      return setSrc('');
    }
    dispatch(setLoading({...state.loading, modal: true}));

    apiService.getDataByID(`${page}`, state.editItemId).then((res) => {
      dispatch(setLoading({...state.loading, modal: false}));
      setEditItem(res);
      setSrc(`http://3.138.61.64/file/${res?.image?.path}`);
      setImage(res.image)
    });
  }, [state.editItemId]);

  const postItem = (data: itemType) => {
    dispatch(setLoading({...state.loading, modal: true}));
    if(editItem?._id){      
      apiService.editData(`${page}`, {
        name_uz: data.name_uz,
        name_ru: data.name_ru,
        name_en: data.name_en,
        image: image
      }, editItem?._id)
      .finally(() => {
        dispatch(setLoading({...state.loading, modal: false}));
      })
      .then(() => {
        message.success('Succesfuly posted', 2);
        form.resetFields();
        setPhoto(undefined);
        setSrc('');
        dispatch(setVisible(false));
        getItems();
        setImage('')
      })
      .catch((err) => {
        message.error(err.message, 3);
      });
    }else {
      apiService.postData(`${page}`, {
        name_uz: data.name_uz,
        name_ru: data.name_ru,
        name_en: data.name_en,
        image: image
      })
      .finally(() => {
        dispatch(setLoading({...state.loading, modal: false}));
      })
      .then(() => {
        message.success('Succesfuly posted', 2);
        if (!editItem?._id) {
          form.resetFields();
          setPhoto(undefined);
          setSrc('');
        }
        dispatch(setVisible(false));
        getItems();
        setImage('')
      })
      .catch((err) => {
        message.error(err.message, 3);
      });
    }
  };

  // Handlers
  const handleSubmit = () => {
    postItem(form.getFieldsValue());
  };

  //UPLOAD DRAGGER FUNCTIONS
  const onPreview = (file: any) => {
    (async function () {
      let src = file.url;
      if (!src && photo) {
        src = await loadImage(photo.file.originFileObj);
      }

      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    })();
  };

  const onChange = (photo: photoType) => {
    photo.fileList.forEach((el: UploadFile) => (el.status = 'done'));

    const formData: FormData = new FormData()
    photo?.fileList?.length && photo.file.originFileObj && formData.append('photo', photo.file.originFileObj);
    console.log(photo?.file.originFileObj);

    axios.post('http://3.138.61.64/file', formData)
    .then(res => {
      console.log(res?.data)
      setImage(res?.data)
    })
  };

  const onRemove = () => {};

  return (
    <Modal
        title={`Enter ${page} infos`}
        width={800}
        centered={true}
        footer={null}
        visible={state.visible}
        onCancel={() => {
          dispatch(setVisible(false));
        }}
        onOk={form.submit}>
        <Spin spinning={state.loading.modal}>
          <Form
            onKeyPress={(e) => {
              if (e.key === 'Enter') form.submit();
            }}
            onFinish={handleSubmit}
            form={form}
            // onFinishFailed={result}
            layout='vertical'
            className={scss.form}>
            <Form.Item
              name='name_uz'
              label='Name in Uzbek'
              rules={[
                {required: true, message: <IntlMessages id='common.enterNameUz' />,},
              ]}
              hasFeedback>
              <Input placeholder='Enter the name in Uzbek' />
            </Form.Item>

            <Form.Item
              name='name_en'
              label='Name in English'
              rules={[
                {required: true, message: <IntlMessages id='common.enterNameEn' />,},
              ]}
              hasFeedback>
              <Input placeholder='Enter the name in English' />
            </Form.Item>

            <Form.Item
              name='name_ru'
              label='Name in Russian'
              rules={[
                {required: true, message: <IntlMessages id='common.enterNameRu' />,},
              ]}
              hasFeedback>
              <Input placeholder='Enter the name in Russian' />
            </Form.Item>

            <Form.Item name='photo' label='Image'>
            <ImgCrop rotate>
                <Upload.Dragger
                  listType='picture'
                  maxCount={1}
                  accept='image/png, image/jpeg'
                  onPreview={onPreview}
                  onChange={onChange}
                  onRemove={onRemove}>
                    {
                      src ? (
                        <img src={src} alt='' style={{ height: '150px' }}/>
                      ) : 
                      <>
                        Drag file here OR <br />
                        <Button icon={<UploadOutlined />} className={scss.upload}>
                          Click to Upload
                        </Button>
                      </>
                    }
                </Upload.Dragger>
              </ImgCrop>
            </Form.Item>

            <Form.Item className={scss.buttons}>
              <Button
                danger
                htmlType='button'
                onClick={() => {
                  dispatch(setVisible(false));
                }}
                className={scss.button}>
                Cencel
              </Button>
              <Button type='primary' className={scss.button} htmlType='submit'>Submit</Button>
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
