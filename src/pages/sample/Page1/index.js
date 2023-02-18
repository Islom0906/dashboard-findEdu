import {
  Avatar,
  Image,
  Tooltip,
  Typography,
  Spin,
  message,
  Row,
  Col,
  Input,
  Button,
  Space,
} from 'antd';
import React, {useEffect, useMemo, useState} from 'react';
import ReactHtmlParser from 'react-render-html';
import MainTable from 'components/Table';

import apiService from '../../../service/api';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  EyeOutlined,
  FileImageOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import IntlMessages from '@crema/utility/IntlMessages';
import EduModal from './EduModal';

const formatFetchedItems = (items) => {
  return items.map((item) => ({
    key: item._id,
    address: item.mainAddress,
    name_Uz: item.name_Uz,
    name_Ru: item.name_Ru,
    name_En: item.name_En,
    phone: item.phone,
    photo: item.photo,
    online_exist: item.isOnlineExists,
    description: [
      item.description_Uz,
      item.description_Ru,
      item.description_En,
    ],
  }));
};
const cellRenderer = (text, isTelnumber) =>
  text && text?.length && text?.[0] ? (
    isTelnumber ? (
      text[0].split(',').map((singleNumber, index) => (
        <Typography.Link keyboard key={index} href={`tel:${singleNumber}`}>
          {singleNumber}
        </Typography.Link>
      ))
    ) : (
      <Tooltip title={text}>
        <Typography.Text style={{maxWidth: 130}} ellipsis>
          {text}
        </Typography.Text>
      </Tooltip>
    )
  ) : (
    <Typography.Text keyboard>
      <IntlMessages id='common.noDat' />
    </Typography.Text>
  );
const columns = [
  {
    dataIndex: 'name_Uz',
    title: <IntlMessages id='common.nameUzTitle' />,
    render: (data) => cellRenderer(data, false),
    ellipsis: true,
  },
  {
    dataIndex: 'name_Ru',
    title: <IntlMessages id='common.nameRuTitle' />,
    render: (data) => cellRenderer(data, false),
    ellipsis: true,
  },
  {
    dataIndex: 'name_En',
    title: <IntlMessages id='common.nameEnTitle' />,
    render: (data) => cellRenderer(data, false),
    ellipsis: true,
  },
  {
    dataIndex: 'address',
    title: <IntlMessages id='common.address' />,
    render: (data) => cellRenderer(data, false),
    ellipsis: true,
  },
  {
    dataIndex: 'phone',
    title: <IntlMessages id='common.phone' />,
    render: (data) => cellRenderer(data, true),
    ellipsis: true,
    // width: 150,
  },
  {
    dataIndex: 'online_exist',
    title: <IntlMessages id='common.onlineExist' />,
    render: (text) => {
      return text ? (
        <CheckCircleTwoTone style={{fontSize: '32px'}} />
      ) : (
        <CloseCircleTwoTone style={{fontSize: '32px'}} twoToneColor='#dc3545' />
      );
    },
  },
  {
    dataIndex: 'photo',
    title: <IntlMessages id='common.image' />,
    width: 80,
    render: (imgUrl) => {
      return imgUrl && imgUrl !== 'undefined' ? (
        <Image
          src={`http://18.216.178.179/api/v1/img/${imgUrl}`}
          style={{height: 40, width: 40, objectFit: 'cover'}}
          preview={{
            mask: <EyeOutlined />,
          }}
        />
      ) : (
        <Avatar size={'large'} shape='square' icon={<FileImageOutlined />} />
      );
    },
  },
];

const search = (query, list) =>
  list.filter(
    (item) =>
      item.name_Uz.toLowerCase().includes(query) ||
      item.name_Ru.toLowerCase().includes(query) ||
      item.name_En.toLowerCase().includes(query),
  );

/* Component ============================= */
const Page1 = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [editItemId, setEditItemId] = useState('');

  const filteredText = useMemo(
    () => search(searchQuery, items),
    [searchQuery, items],
  );

  const editHandler = (e) => {
    setModalTitle('Edit education');
    setIsModalVisible(true);
    setEditItemId(e.key);
  };

  const getItems = () => {
    setLoading(true);
    apiService
      .getData(`/edu`)
      .then((res) => {
        setLoading(false);
        setItems(formatFetchedItems(res.data));
      })
      .catch((err) => console.error('MyError', err));
  };

  const deleteItem = async ({key: itemId}) => {
    try {
      await apiService.deleteData('/edu', itemId);
      message.success('Deleted successfully');
      getItems();
    } catch (error) {
      message.error(error.message);
    }
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
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
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
        editItemId={editItemId}
      />
      <Spin spinning={loading}>
        <MainTable
          datas={filteredText}
          cols={columns}
          onEdit={editHandler}
          onDelete={deleteItem}
          expandable={{
            expandedRowRender: (record) => {
              const languages = ['(Uz)', '(Ru)', '(En)'];
              return record.description.map((item, index) => {
                return (
                  <div key={index}>
                    {languages[index]}: {ReactHtmlParser(item)}
                  </div>
                );
              });
            },
            rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
        />
      </Spin>
    </>
  );
};

export default Page1;
