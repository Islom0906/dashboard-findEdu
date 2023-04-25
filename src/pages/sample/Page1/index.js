import {
  Avatar,
  Image,
  Spin,
  Row,
  Col,
  Input,
  Button,
  Space,
} from 'antd';
import React, {useEffect, useState} from 'react';
import MainTable from '../../../components/Table';

import apiService from 'service/api';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  EyeOutlined,
  FileImageOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import IntlMessages from '@crema/utility/IntlMessages';
import EduModal from './EduModal';
    
  const columns = [
    {
      key: 1,
      dataIndex: 'name_uz',
      title: <IntlMessages id='common.nameUzTitle' />,
    },
    {
      key: 2,
      dataIndex: 'name_en',
      title: <IntlMessages id='common.nameEnTitle' />,
    },
    {
      key: 3,
      dataIndex: 'name_ru',
      title: <IntlMessages id='common.nameRuTitle' />,
    },
    {
      key: 4,
      dataIndex: 'onlineExists',
      title: <IntlMessages id='common.onlineExist' />,
      render: (val) => {
        return val ? <CheckCircleTwoTone twoToneColor={"green"} style={{ fontSize: '20px' }} /> : <CloseCircleTwoTone twoToneColor={"red"} style={{ fontSize: '20px' }} />
      }
    },
    {
      key: 5,
      title: <IntlMessages id='common.image' />,
      dataIndex: 'image',
      width: 80,
      render: (imgUrl) => {
        return imgUrl && imgUrl !== null ? (
          <Image
            src={`http://3.138.61.64/file/${imgUrl?.path}`}
            style={{height: 40, width: 40, objectFit: 'cover'}}
            preview={{
              maskClassName: 'customize-mask',
              mask: <EyeOutlined />,
            }}
          />
        ) : (
          <Avatar size={'large'} shape='square' icon={<FileImageOutlined />} />
        );
      },
    },
    {
      key: 6,
      dataIndex: 'mainAddress',
      title: <IntlMessages id='common.mainAddress' />,
    },
  ];

/* Component ============================= */
const Page1 = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const getItems = () => {
    setLoading(true);
    apiService
      .getData(`/edu`)
      .then((res) => {
        setLoading(false);
        setItems(res.data);
      })
      .catch((err) => console.error('MyError', err));
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleCancal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <h2>
        <IntlMessages id='common.eduCenters' />
      </h2>

      <Row gutter={12}>
        <Col span={17}>
          <Input
            size='large'
            placeholder='Search...'
          />
        </Col>
        <Col span={3}>
          <Button block onClick={getItems} disabled={loading}>
            <Space>
              {loading && <SyncOutlined spin />}
              <IntlMessages id='common.refresh' />
            </Space>
          </Button>
        </Col>

        <Col span={4}>
          <Button
            block
            type='primary'
            onClick={() => {
              setIsModalVisible(true);
              setModalTitle('Add Education');
            }}>
            <IntlMessages id='common.add' />
          </Button>
        </Col>
      </Row>

      <EduModal
        visible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        title={modalTitle}
        onCancel={handleCancal}
        getItems={getItems}
      />
      
      <Spin spinning={loading}>
        <MainTable
          datas={items}
          cols={columns}
        />
      </Spin>
    </>
  );
};

export default Page1;
