import React, {useEffect, useState} from 'react';
import {Modal,Form,Input,message,Button,Space,Select,Upload,Checkbox,Spin,Row,Col} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import {MinusCircleOutlined, PlusOutlined, UploadOutlined} from '@ant-design/icons';
import apiService from 'service/api';
import './style.css';
import { setVisible } from './ReducerActions';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';

function loadImage(photo) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    photo && reader.readAsDataURL(photo);
    reader.onload = () => {
      console.log(reader.result);

      resolve(reader.result);
    };
  });
}

const EduModal = ({state, dispatch, getItems}) => {
  const [form] = Form.useForm();
  const [descriptionUz, setDescriptionUz] = useState('');
  const [descriptionRu, setDescriptionRu] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [languages, setLanguages] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [it, setIt] = useState([]);
  const [other, setOther] = useState([]);
  const [loading, setLoading] = useState(false);
  const [src, setSrc] = useState();
  const [photo, setPhoto] = useState();
  const [image, setImage] = useState('')

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
    if (state.visible) {
      Promise.all([
        apiService.getData(`/languages`),
        apiService.getData(`/subjects`),
        apiService.getData(`/programs`),
        apiService.getData(`/others`),
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

      setLoading(false)

      if(state.title === "Edit Education Infos") {
        setLoading(true);
        apiService
            .getDataByID('/edu', state?.editItemId)
            .then((res) => {
              fillInFields(res);
              setSrc(`http://3.138.61.64/file/${res?.image?.path}`);
              setImage(res?.image)
            })
            .catch((err) => {
              message.error(err.message);
              console.log(err);
            })
            .finally(() => setLoading(false));
      }else {
        setSrc('')
      }
    }
  }, [state.visible]);

  const fillInFields = (data) => {
    console.log(data);
    const defaultValues = {
      branches: data?.branches?.length && data?.branches[0] ? data.branches.map((item) => ({
        name: item.name,
        mainAddress: item.mainAddress,
        onMap: item.onMap,
        phones: item?.phones?.length && item?.phones[0] ? item.phones.map((num) => ({
          phone: num
        })) : null
      })) : null,
      image: `http://3.138.61.64/file/${data?.image?.path}`,
      insta: data?.links[3]?.link,
      isOnlineExists: data?.onlineExists,
      it: data?.programs.map((item) => item._id),
      langs: data?.languages?.map((item) => item._id),
      mainAddress: data.mainAddress,
      name_en: data?.name_en,
      name_ru: data?.name_ru,
      name_uz: data?.name_uz,
      onMap: data?.onMap,
      other: data?.others?.map((item) => item._id),
      phone: data.phones?.length && data.phones[0]
      ? data.phones.map((item) => ({phone: item}))
      : null,
      subjects: data?.subjects?.map((item) => item._id),
      tg: data?.links[0]?.link,
      web: data?.links[2]?.link,
      youtube: data?.links[1]?.link,
    }
    setDescriptionEn(data.description_en);
    setDescriptionRu(data.description_ru);
    setDescriptionUz(data.description_uz);
    console.log(defaultValues);
    form.setFieldsValue(defaultValues)
  }

  const handleOk = (data) => {
    console.log(data, "handle ok");
    setLoading(true)

    const postData = {
      name_uz: data.name_uz,
      name_ru: data.name_ru,
      name_en: data.name_en,
      description_uz: descriptionUz,
      description_ru: descriptionRu,
      description_en: descriptionEn,
      languages: data.langs,
      subjects: data.subjects,
      programs: data.it,
      others: data.other,
      phones: data.phone.map(elem => elem.phone),
      links: [
        {
          name: "TG",
          link: data.tg
        },
        {
          name: "YT",
          link: data.insta
        },
        {
          name: "WEB",
          link: data.web
        },
        {
          name: "INSTA",
          link: data.insta
        }
      ],
      image: image,
      mainAddress: data.mainAddress,
      onMap: data.onMap,
      branches: data.branches.map(elem => {
        return {
          name: elem.name,
          mainAddress: elem.mainAddress,
          onMap: elem.onMap,
          phones: elem.phones.map(elem => elem.phone)
        }
      }),
      onlineExists: data.isOnlineExists
    }

    console.log(postData, "Post data");

    if(state.title == "Edit Education Infos") {
      console.log(postData, "Edit data");
      apiService.editData(`/edu`, postData, state?.editItemId)
      .then(() => {
        console.log("Success")
        message.success('Succesfuly posted', 2);
        handleCancel()
        resetForm();
        setPhoto(undefined)
        setImage('')
        setSrc('')
        getItems()
      }).catch((err) => {
        console.log("Err")
        message.error(err.message, 2);
      }).finally(() => setLoading(false))
    }else {
      apiService.postData('edu', postData).then(() => {
        console.log("Success")
        message.success('Succesfuly posted', 2);
        handleCancel()
        resetForm();
        setImage('')
        setSrc('')
        setPhoto(undefined)
        getItems()
      }).catch((err) => {
        console.log("Err")
        message.error(err.message, 2);
      }).finally(() => setLoading(false))
    }
  };

  const onPreview = (file) => {
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

  const onChange = (photo) => {
    photo.fileList.forEach((el) => (el.status = 'done'));

    const formData = new FormData()
    photo?.fileList?.length && photo.file.originFileObj && formData.append('photo', photo.file.originFileObj);
    console.log(photo?.file.originFileObj);

    axios.post('http://3.138.61.64/file', formData)
    .then(res => {
      console.log(res?.data)
      setImage(res?.data)
    })
  };

  const onRemove = () => {};

  const handleCancel = () => {
    if(state.title === "Edit Education Infos") {
      resetForm()
    }
    dispatch(setVisible(false))
  };

  const resetForm = () => {
    form.resetFields();
    setDescriptionUz('')
    setDescriptionRu('')
    setDescriptionEn('')
  }

  return (
    <>
      <Modal
        width={'100%'}
        style={{top: '25px'}}
        visible={state.visible}
        title={state.title}
        okText='Submit'
        centered
        footer={null}
        onCancel={handleCancel}
        >
        <Spin spinning={loading}>
          <Form form={form} layout='vertical' onFinish={handleOk}>
            <Row justify={'space-between'} gutter={15}>
              <Col span={8}>
                <Form.Item label='Name Uz' name='name_uz' rules={[{required: true}]}>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label='Name Ru' name='name_ru' rules={[{required: true}]}>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label='Name En' name='name_en' rules={[{required: true}]}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row justify={'space-between'} gutter={15}>
              <Col span={8}>
                <Form.Item label='Description Uz'>
                  <ReactQuill value={descriptionUz} onChange={setDescriptionUz} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label='Descriptio Ru'>
                  <ReactQuill value={descriptionRu} onChange={setDescriptionRu} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label='Description En'>
                  <ReactQuill value={descriptionEn} onChange={setDescriptionEn} />
                </Form.Item>
              </Col>
            </Row>

            <Row justify={'center'}>
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
                        <Button icon={<UploadOutlined />} >
                          Click to Upload
                        </Button>
                      </>
                    }
                </Upload.Dragger>
              </ImgCrop>
            </Row>

            <Row justify='center' gutter={15}>
              <Col span={12}>
                <Form.Item label='Address' name='mainAddress'>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label='On Map' name='onMap'>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={24}>
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
                          type='default'
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}>
                          Add phone number
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>

            <Row gutter={15}>
              <Col span={12}>
                <Form.Item label='Link Telegram' name='tg'>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label='Link Instagram' name='insta'>
                  <Input />
                </Form.Item>
              </Col>
              
              <Col span={12}>
                <Form.Item label='Link Web' name='web'>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label='Link Youtube' name='youtube'>
                  <Input />
                </Form.Item>
              </Col> 
            </Row>

            <Row gutter={15}>
              <Col span={12}>
                <Form.Item name={'langs'} label='Languages'>
                  <Select mode='multiple' placeholder='Select languages' allowClear>
                    {languages?.map((data) => (
                      <Select.Option key={data._id} value={data._id}>
                        {data.name_en}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name={'subjects'} label='Subjects'>
                  <Select mode='multiple' placeholder='Select subjects' allowClear>
                    {subjects?.map((data) => (
                      <Select.Option key={data._id} value={data._id}>
                        {data.name_en}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name={'it'} label='IT'>
                  <Select mode='multiple' placeholder='Select IT' allowClear>
                    {it?.map((data) => (
                      <Select.Option key={data._id} value={data._id}>
                        {data.name_en}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name={'other'} label='Others'>
                  <Select mode='multiple' placeholder='Select others' allowClear>
                    {other?.map((data) => (
                      <Select.Option key={data._id} value={data._id}>
                        {data.name_en}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name='isOnlineExists' valuePropName='checked'>
              <Checkbox defaultChecked>Is online exist</Checkbox>
            </Form.Item>

            <Form.List name='branches'>
                  {(fields, {add, remove}) => (
                    <>
                    {
                      fields.map((field) => {
                        return (
                          <Row key={field.key} gutter={15}>
                            <Col span={5}>
                              <Form.Item name={[field.name, "name"]}>
                                <Input />
                              </Form.Item> 
                            </Col> 

                            <Col span={5}>
                              <Form.Item name={[field.name, "mainAddress"]}>
                                <Input />
                              </Form.Item> 
                            </Col>

                            <Col span={5}>
                              <Form.Item name={[field.name, "onMap"]}>
                                <Input />
                              </Form.Item> 
                            </Col>

                            <Col span={5}>
                              <Form.List name={[field.name, "phones"]}>
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
                                        type='default'
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}>
                                        Add phone number
                                      </Button>
                                    </Form.Item>
                                  </>
                                )}
                              </Form.List>
                            </Col>

                            <Col span={4}>
                              <Form.Item>
                                <Button block icon={<MinusCircleOutlined />} onClick={() => remove(field.name)} danger />
                              </Form.Item>
                            </Col>
                          </Row>
                        )
                      })
                    }
                    <Form.Item>
                      <Button icon={<PlusOutlined />} block onClick={add} type='default'>Add new branch</Button>
                    </Form.Item>
                    </>
                  )}
            </Form.List>

            <Row
              gutter={12}
              justify='end'
              style={({width: '100%'})}>
              <Col>
                <Form.Item>
                  <Button htmlType='submit' type='primary'>
                    Submit
                  </Button>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item>
                  <Button
                    type='default'
                    onClick={handleCancel}>
                      Cancel
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>
    </>
  );
};

EduModal.propTypes = {
  visible: PropTypes.bool,
  getItems: PropTypes.func,
  title: PropTypes.string,
  dispatch: PropTypes.func,
  state: PropTypes.object
};

export default EduModal;
