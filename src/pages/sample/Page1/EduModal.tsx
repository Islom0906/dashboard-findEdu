import {useEffect, useState} from 'react';
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
import scss from '../main.module.scss'
import { EduPropsTypes, FormDataType, ItemTypes, itemType, photoType } from '../Types';

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

const EduModal = ({state, dispatch, getItems}: EduPropsTypes) => {
  const [form] = Form.useForm();
  const [descriptionUz, setDescriptionUz] = useState('');
  const [descriptionRu, setDescriptionRu] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [datas, setDatas] = useState({ languages: [], subjects: [], programs: [], others: [] })
  const [loading, setLoading] = useState(false);
  const [src, setSrc] = useState<string | null>();
  const [photo, setPhoto] = useState<photoType | null>(null);
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
          setDatas({
            languages: langsRes?.data, 
            subjects: subjectsRes?.data,
            programs: itRes?.data,
            others: otherRes?.data
          })
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
              setSrc(`http://16.16.76.41/file/${res?.image?.path}`);
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

  const fillInFields = (data: ItemTypes) => {
    const defaultValues = {
      branches: data?.branches?.length && data?.branches[0] ? data.branches.map((item) => ({
        name: item.name,
        mainAddress: item.mainAddress,
        onMap: item.onMap,
        phones: item?.phones?.length && item?.phones[0] ? item.phones.map((num) => ({
          phone: num
        })) : null
      })) : null,
      image: `http://16.16.76.41/file/${data?.image?.path}`,
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

  const handleOk = (data: FormDataType) => {
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

    if(state.title == "Edit Education Infos") {
      console.log(postData, "Edit data");
      apiService.editData(`/edu`, postData, state?.editItemId)
      .then(() => {
        console.log("Success")
        message.success('Succesfuly posted', 2);
        handleCancel()
        resetForm();
      }).catch((err) => {
        console.log("Err")
        message.error(err.message, 2);
      }).finally(() => setLoading(false))
    }else {
      apiService.postData('edu', postData)
      .then(() => {
        console.log("Success")
        message.success('Succesfuly posted', 2);
        handleCancel()
        resetForm();
      }).catch((err) => {
        console.log("Err")
        message.error(err.message, 2);
      }).finally(() => setLoading(false))
    }
  };

  const onPreview = (file: any) => {
    (async function () {
      let src = file.url;
      if (!src && photo) {
        src = await loadImage(photo?.file.originFileObj);
      }

      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    })();
  };

  const onChange = (photo: photoType) => {
    photo.fileList.forEach((el) => (el.status = 'done'));
    const formData = new FormData()
    photo?.fileList?.length && photo.file.originFileObj && formData.append('photo', photo.file.originFileObj);

    axios.post('http://16.16.76.41/file', formData)
    .then(res => {
      console.log(res?.data)
      setSrc(`http://16.16.76.41/file/${res?.data?.path}`)
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
    setImage('')
    setSrc('')
    setPhoto(null)
    getItems()
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
                <Form.Item label='Name Uz' name='name_uz' rules={[{required: true}]} hasFeedback>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label='Name Ru' name='name_ru' rules={[{required: true}]} hasFeedback>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label='Name En' name='name_en' rules={[{required: true}]} hasFeedback>
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row justify={'space-between'} gutter={15}>
              <Col span={24}>
                <Form.Item label='Description Uz' rules={[{required: true}]} hasFeedback>
                  <ReactQuill value={descriptionUz} onChange={setDescriptionUz} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label='Descriptio Ru' rules={[{required: true}]} hasFeedback>
                  <ReactQuill value={descriptionRu} onChange={setDescriptionRu} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label='Description En' rules={[{required: true}]} hasFeedback>
                  <ReactQuill value={descriptionEn} onChange={setDescriptionEn} />
                </Form.Item>
              </Col>
            </Row>

            <Row justify='center' gutter={15}>
              <Col span={12}>
                <Form.Item label='Address' name='mainAddress' rules={[{required: true}]} hasFeedback>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label='On Map' name='onMap' rules={[{required: true}]} hasFeedback>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.List name='phone'>
                  {(fields, {add, remove}) => (
                    <>
                      {fields.length === 0 && (
                        <Space
                          key={0}
                          style={{
                            display: 'flex',
                            marginBottom: 8,
                          }}
                          align='baseline'>
                          <Form.Item
                            name={[0, 'phone']}
                            rules={[{required: true}]}
                            hasFeedback>
                            <Input placeholder='Phone' />
                          </Form.Item>
                        </Space>
                      )}
                      {fields.map(({key, name, ...restField}) => (
                        <Space
                          key={key}
                          style={{
                            display: 'flex',
                            marginBottom: 8,
                          }}
                          align='baseline'>
                          <Form.Item {...restField} name={[name, 'phone']} rules={[{required: true}]} hasFeedback>
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
                <Form.Item label='Link Telegram' name='tg' rules={[
                    {
                      required: true
                    }, 
                    {
                      type: 'url',
                      message: 'Please enter a valid URL',
                    }
                  ]} hasFeedback>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label='Link Instagram' name='insta' rules={[
                    {
                      required: true
                    }, 
                    {
                      type: 'url',
                      message: 'Please enter a valid URL',
                    }
                  ]} hasFeedback>
                  <Input />
                </Form.Item>
              </Col>
              
              <Col span={12}>
                <Form.Item label='Link Web' name='web' rules={[
                    {
                      required: true
                    }, 
                    {
                      type: 'url',
                      message: 'Please enter a valid URL',
                    }
                  ]} hasFeedback>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label='Link Youtube' name='youtube' rules={[
                    {
                      required: true
                    }, 
                    {
                      type: 'url',
                      message: 'Please enter a valid URL',
                    }
                  ]} hasFeedback>
                  <Input />
                </Form.Item>
              </Col> 
            </Row>

            <Row gutter={15}>
              <Col span={12}>
                <Form.Item name={'langs'} label='Languages' rules={[{required: false}]} hasFeedback>
                  <Select mode='multiple' placeholder='Select languages' allowClear>
                    {datas?.languages?.map((data: itemType) => (
                      <Select.Option key={data._id} value={data._id}>
                        {data.name_en}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name={'subjects'} label='Subjects' rules={[{required: true}]} hasFeedback>
                  <Select mode='multiple' placeholder='Select subjects' allowClear>
                    {datas?.subjects?.map((data: itemType) => (
                      <Select.Option key={data._id} value={data._id}>
                        {data.name_en}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name={'it'} label='Programs' rules={[{required: true}]} hasFeedback>
                  <Select mode='multiple' placeholder='Select IT' allowClear>
                    {datas?.programs?.map((data: itemType) => (
                      <Select.Option key={data._id} value={data._id}>
                        {data.name_en}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item name={'other'} label='Others' rules={[{required: true}]} hasFeedback>
                  <Select mode='multiple' placeholder='Select others' allowClear>
                    {datas?.others?.map((data: itemType) => (
                      <Select.Option key={data._id} value={data._id}>
                        {data.name_en}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name='isOnlineExists' valuePropName='checked' rules={[{required: true}]}>
              <Checkbox defaultChecked>Is online exist</Checkbox>
            </Form.Item>

            <Form.List name='branches'>
                  {(fields, {add, remove}) => (
                    <>
                    {fields.length === 0 && (
                      <Row key={0} gutter={15}>
                        <Col span={5}>
                          <Form.Item name={[0, "name"]} label='Branch Name' rules={[{required: true}]} hasFeedback>
                            <Input />
                          </Form.Item> 
                        </Col> 

                        <Col span={5}>
                          <Form.Item name={[0, "mainAddress"]} label='Main Address' rules={[{required: true}]} hasFeedback>
                            <Input />
                          </Form.Item> 
                        </Col>

                        <Col span={5}>
                          <Form.Item name={[0, "onMap"]} label='On Map' rules={[{required: true}]} hasFeedback>
                            <Input />
                          </Form.Item> 
                        </Col>

                            <Col span={5}>
                              <Form.List name={[0, "phones"]}>
                                {(fields, {add, remove}) => (
                                  <>
                                    {
                                      fields.length === 0 && (
                                        <Space
                                        key={0}
                                        style={{
                                          display: 'flex',
                                          marginBottom: 8,
                                        }}
                                        align='baseline'>
                                        <Form.Item name={[0, 'phone']} rules={[{required: true}]} hasFeedback>
                                          <Input placeholder='Phone' />
                                        </Form.Item>
                                      </Space>
                                      )
                                    }
                                    {fields.map(({key, name, ...restField}) => (
                                      <Space
                                        key={key}
                                        style={{
                                          display: 'flex',
                                          marginBottom: 8,
                                        }}
                                        align='baseline'>
                                        <Form.Item {...restField} name={[name, 'phone']} rules={[{required: true}]} hasFeedback>
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
                            <Button block icon={<MinusCircleOutlined />} onClick={() => remove(0)} danger />
                          </Form.Item>
                        </Col>
                      </Row>
                    )}
                    
                    {
                      fields.map((field) => {
                        return (
                          <Row key={field.key} gutter={15}>
                            <Col span={5}>
                              <Form.Item name={[field.name, "name"]} rules={[{required: true}]} hasFeedback>
                                <Input />
                              </Form.Item> 
                            </Col> 

                            <Col span={5}>
                              <Form.Item name={[field.name, "mainAddress"]} rules={[{required: true}]} hasFeedback>
                                <Input />
                              </Form.Item> 
                            </Col>

                            <Col span={5}>
                              <Form.Item name={[field.name, "onMap"]} rules={[{required: true}]} hasFeedback>
                                <Input />
                              </Form.Item> 
                            </Col>

                            <Col span={5}>
                              <Form.List name={[field.name, "phones"]}>
                                {(fields, {add, remove}) => (
                                  <>
                                    {
                                      fields.length === 0 && (
                                        <Space
                                        key={0}
                                        style={{
                                          display: 'flex',
                                          marginBottom: 8,
                                        }}
                                        align='baseline'>
                                        <Form.Item label="Phone" name={[0, 'phone']} rules={[{required: true}]} hasFeedback>
                                          <Input placeholder='Phone' />
                                        </Form.Item>
                                      </Space>
                                      )
                                    }
                                    {fields.map(({key, name, ...restField}) => (
                                      <Space
                                        key={key}
                                        style={{
                                          display: 'flex',
                                          marginBottom: 8,
                                        }}
                                        align='baseline'>
                                        <Form.Item {...restField} name={[name, 'phone']} rules={[{required: true}]} hasFeedback>
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

            {
              src ? (
                <div className={scss.uploadImage}>
                  <img src={src} alt='uploaded image'/>
                  {/* <Button type='primary' danger>Remove <MinusCircleOutlined /></Button> */}
                  <Button icon={<MinusCircleOutlined />} danger onClick={() => setSrc(null)}>Remove</Button>
                </div>
              ) : 
              <Form.Item name='photo' label='Image' rules={[
                { required: true, message: 'Please upload an image.' },
              ]}>
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
            }

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
