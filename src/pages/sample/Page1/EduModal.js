import React, {useEffect, useState} from 'react';
import {
  Modal,
  Form,
  Input,
  Upload,
  message,
  Button,
  Space,
  Select,
  Checkbox,
  Spin,
} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImgCrop from 'antd-img-crop';
import PropTypes from 'prop-types';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import apiService from 'service/api';
import './style.css';

const EduModal = ({
  visible,
  title,
  setIsModalVisible,
  getItems,
  editItemId,
}) => {
  const [form] = Form.useForm();
  const [descriptionUz, setDescriptionUz] = useState('');
  const [descriptionRu, setDescriptionRu] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [languages, setLanguages] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [it, setIt] = useState([]);
  const [other, setOther] = useState([]);
  const [loading, setLoading] = useState(false);

  const creatingImageFile = (imgId) => {
    return fetch(`http://18.216.178.179/api/v1/img/${imgId}`)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], 'image.jpeg', {type: blob.type});
        setFileList([
          {
            thumbUrl: `http://18.216.178.179/api/v1/img/${imgId}`,
            originFileObj: file,
          },
        ]);
      })
      .catch((error) => {
        console.error('Error fetching image data:', error);
      });
  };

  useEffect(() => {
    if (visible) {
      Promise.all([
        apiService.getData(`/langs`),
        apiService.getData(`/subjects`),
        apiService.getData(`/it`),
        apiService.getData(`/other`),
      ])
        .then(([langsRes, subjectsRes, itRes, otherRes]) => {
          setLanguages(langsRes.data);
          setSubjects(subjectsRes.data);
          setIt(itRes.data);
          setOther(otherRes.data);
        })
        .catch((err) => {
          console.log(err);
          message.error(err.message);
        });

      if (title === 'Edit education') {
        setLoading(true);
        apiService
          .getDataByID('edu', editItemId)
          .then((res) => {
            fillInFields(res.data);
            return creatingImageFile(res.data.photo);
          })
          .catch((err) => {
            message.error(err.message);
            console.log(err);
          })
          .finally(() => setLoading(false));
      } else {
        resetAllFileds();
      }
    }
  }, [visible]);

  const fillInFields = (values) => {
    const defaultValues = {
      name_uz: values.name_uz,
      name_ru: values.name_ru,
      name_en: values.name_en,
      mainAddress: values.mainAddress,
      phone:
        values.phone?.length && values.phone[0]
          ? values.phone[0].split(',').map((item) => ({phone: item}))
          : null,
      tg: values.links.find(
        (item) => item.name === 'tg' || item.name === 'telegram',
      ).link,
      insta: values.links.find(
        (item) => item.name === 'insta' || item.name === 'instagram',
      ).link,
      web: values.links.find((item) => item.name === 'web').link,
      youtube: values.links.find((item) => item.name === 'youtube').link,
      langs: values.langs?.map((item) => item._id) || [],
      subjects: values.subjects?.map((item) => item._id) || [],
      it: values.it?.map((item) => item._id) || [],
      other: values.other?.map((item) => item._id) || [],
      isOnlineExists: values.isOnlineExists,
    };
    setDescriptionEn(values.description_En);
    setDescriptionRu(values.description_Ru);
    setDescriptionUz(values.description_Uz);
    form.setFieldsValue(defaultValues);
  };

  const handleBeforeUpload = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const allowedSize = 5 * 1024 * 1024; // 5 MB

    if (!allowedTypes.includes(file.type)) {
      message.error(
        `File type ${file.type} is not allowed. Please upload an image of type JPEG, PNG or GIF.`,
      );
      return false;
    }

    if (file.size > allowedSize) {
      message.error(
        `File size is too large. Please upload an image of size up to 5 MB.`,
      );
      return false;
    }

    return true;
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleFileListChange = ({fileList}) => {
    setFileList(fileList);
  };

  const handlePreviewCancel = () => {
    setPreviewVisible(false);
  };

  const getBase64 = (file) => {
    if (!file) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const resetAllFileds = () => {
    form.resetFields();
    setDescriptionUz('');
    setDescriptionRu('');
    setDescriptionEn('');
    setFileList([]);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        postValues({
          ...values,
          descriptionUz: descriptionUz,
          descriptionRu: descriptionRu,
          descriptionEn: descriptionEn,
          fileList,
        });
        resetAllFileds();
      })
      .catch((err) => {
        err.errorFields.map((errItem) => {
          message.error(errItem.errors);
        });
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRemoveFile = (file) => {
    setFileList((prevFileList) =>
      prevFileList.filter((f) => f.uid !== file.uid),
    );
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const postValues = (data) => {
    setLoading(true);
    const links = [
      {
        name: 'telegram',
        link: data.tg || '',
      },
      {
        name: 'instagram',
        link: data.insta || '',
      },
      {
        name: 'web',
        link: data.web || '',
      },
      {
        name: 'youtube',
        link: data.youtube || '',
      },
    ];

    const lang = data.langs || [];
    const it = data.it || [];
    const other = data.other || [];
    const subjects = data.subjects || [];
    const phone = data.phone
      ? data.phone.map((item) => item.phone).join(',')
      : '';

    const formData = new FormData();
    formData.append('name_uz', data.name_uz);
    formData.append('name_ru', data.name_ru);
    formData.append('name_en', data.name_en);
    formData.append('description_Uz', data.descriptionUz);
    formData.append('description_Ru', data.descriptionRu);
    formData.append('description_En', data.descriptionEn);
    formData.append('mainAddress', data.mainAddress || '');
    formData.append('isOnlineExists', data.isOnlineExists || false);
    formData.append('links', JSON.stringify(links));
    formData.append('langs', JSON.stringify(lang));
    formData.append('it', JSON.stringify(it));
    formData.append('other', JSON.stringify(other));
    formData.append('subjects', JSON.stringify(subjects));
    formData.append('phone', phone);
    formData.append('photo', data.fileList[0].originFileObj);

    if (title === 'Edit education') {
      apiService
        .editData('/edu', formData, editItemId)
        .then(() => {
          message.success('Edited successfully');
          getItems();
        })
        .catch((err) => {
          console.log(err);
          message.error(err.message);
        })
        .finally(() => {
          setIsModalVisible(false);
          setLoading(false);
        });
    } else {
      apiService
        .postData('/edu', formData)
        .then(() => {
          message.success('Submitted successfully');
          getItems();
        })
        .catch((err) => {
          console.log(err);
          message.error(err.message);
        })
        .finally(() => {
          setIsModalVisible(false);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Modal
        width={'700px'}
        visible={visible}
        title={title}
        okText='Submit'
        onCancel={handleCancel}
        onOk={handleOk}>
        <Spin spinning={loading}>
          <Form form={form} layout='vertical'>
            <Form.Item label='NameUz' name='name_uz' rules={[{required: true}]}>
              <Input />
            </Form.Item>
            <Form.Item label='NameRu' name='name_ru' rules={[{required: true}]}>
              <Input />
            </Form.Item>
            <Form.Item label='NameEn' name='name_en' rules={[{required: true}]}>
              <Input />
            </Form.Item>
            <Form.Item label='DescriptionUz'>
              <ReactQuill value={descriptionUz} onChange={setDescriptionUz} />
              {/* <p>{JSON.stringify(descriptionUz)}</p> */}
            </Form.Item>
            <Form.Item label='DescriptionRu'>
              <ReactQuill value={descriptionRu} onChange={setDescriptionRu} />
              {/* <p>{JSON.stringify(descriptionRu)}</p> */}
            </Form.Item>
            <Form.Item label='DescriptionEn'>
              <ReactQuill value={descriptionEn} onChange={setDescriptionEn} />
              {/* <p>{JSON.stringify(descriptionEn)}</p> */}
            </Form.Item>
            <Form.Item
              label='Image'
              name='image'
              rules={[
                {
                  validator: () => {
                    if (fileList?.length) return Promise.resolve(fileList);

                    return Promise.reject('Pleae upload a image');
                  },
                },
              ]}
              getValueFromEvent={normFile}
              valuePropName='fileList'>
              <ImgCrop rotate>
                <Upload
                  accept='.jpeg,.png'
                  beforeUpload={handleBeforeUpload}
                  listType='picture-card'
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleFileListChange}
                  onRemove={handleRemoveFile}>
                  {fileList.length < 1 && '+ Upload'}
                </Upload>
              </ImgCrop>
            </Form.Item>
            <Form.Item label='Address' name='mainAddress'>
              <Input />
            </Form.Item>
            <Form.List name='phone'>
              {(fields, {add, remove}) => (
                <>
                  {fields.map(({key, name, ...restField}) => (
                    <Space
                      key={key}
                      style={{
                        display: 'flex',
                        marginBottom: 8,
                      }}
                      align='baseline'>
                      <Form.Item {...restField} name={[name, 'phone']}>
                        <Input placeholder='Phone' />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type='dashed'
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}>
                      Add phone number
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item label='Link Telegram' name='tg'>
              <Input />
            </Form.Item>
            <Form.Item label='Link Instagram' name='insta'>
              <Input />
            </Form.Item>
            <Form.Item label='Link Web' name='web'>
              <Input />
            </Form.Item>
            <Form.Item label='Link Youtube' name='youtube'>
              <Input />
            </Form.Item>
            <Form.Item name={'langs'} label='Languages'>
              <Select mode='multiple' placeholder='Select languages' allowClear>
                {languages.map((data) => (
                  <Select.Option key={data._id} value={data._id}>
                    {data.name_en}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name={'subjects'} label='Subjects'>
              <Select mode='multiple' placeholder='Select subjects' allowClear>
                {subjects.map((data) => (
                  <Select.Option key={data._id} value={data._id}>
                    {data.name_en}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name={'it'} label='IT'>
              <Select mode='multiple' placeholder='Select IT' allowClear>
                {it.map((data) => (
                  <Select.Option key={data._id} value={data._id}>
                    {data.name_en}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name={'other'} label='Others'>
              <Select mode='multiple' placeholder='Select others' allowClear>
                {other.map((data) => (
                  <Select.Option key={data._id} value={data._id}>
                    {data.name_en}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='isOnlineExists' valuePropName='checked'>
              <Checkbox defaultChecked>Is online exist</Checkbox>
            </Form.Item>
          </Form>
          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={handlePreviewCancel}>
            <img alt='Preview' style={{width: '100%'}} src={previewImage} />
          </Modal>
        </Spin>
      </Modal>
    </>
  );
};

EduModal.propTypes = {
  visible: PropTypes.bool,
  onCreate: PropTypes.func,
  setIsModalVisible: PropTypes.func,
  getItems: PropTypes.func,
  title: PropTypes.string,
  editItemId: PropTypes.string,
};

export default EduModal;
