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
import MainTable from 'components/Table';

import apiService from '../../../service/api';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  FileImageOutlined,
  SyncOutlined,
} from '@ant-design/icons';

const formatFetchedItems = (items) =>
  items.map((item) => ({
    key: item._id,
    address: item.mainAddress,
    name_Uz: item.name_Uz,
    phone: item.phone,
    photo: item.photo,
    online_exist: item.isOnlineExists,
  }));
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
        <Typography.Text ellipsis>{text}</Typography.Text>
      </Tooltip>
    )
  ) : (
    <Typography.Text keyboard>No data</Typography.Text>
  );
const columns = [
  {
    dataIndex: 'name_Uz',
    title: 'Name uz',
    render: (data) => cellRenderer(data, false),
  },
  {
    dataIndex: 'address',
    title: 'Address',
    render: (data) => cellRenderer(data, false),
  },
  {
    dataIndex: 'phone',
    title: 'Phone',
    render: (data) => cellRenderer(data, true),
    // width: 150,
  },
  {
    dataIndex: 'online_exist',
    title: 'Online exist',
    render: (text) => {
      return text ? (
        <CheckCircleTwoTone style={{fontSize: '32px'}} />
      ) : (
        <CloseCircleTwoTone style={{fontSize: '32px'}} twoToneColor='#dc3545' />
      );
    },
  },
  {
    title: 'Image',
    dataIndex: 'photo',
    width: 80,
    render: (imgUrl) => {
      return imgUrl && imgUrl !== 'undefined' ? (
        <Image
          src={`http://18.216.178.179/api/v1/img/${imgUrl}`}
          style={{height: 40, width: 40, objectFit: 'cover'}}
        />
      ) : (
        <Avatar size={'large'} shape='square' icon={<FileImageOutlined />} />
      );
    },
  },
];

const editBtn = (e) => {
  console.log('Edit', e);
};

const search = (query, list) =>
  list.filter((item) => item.name_Uz.toLowerCase().includes(query));
const Page1 = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredText = useMemo(
    () => search(searchQuery, items),
    [searchQuery, items],
  );

  const getItems = () => {
    setLoading(true);
    apiService
      .getData(`/edu`)
      .then((res) => {
        setLoading(false);
        setItems(formatFetchedItems(res.data));
        console.log(res);
      })
      .catch((err) => console.error('MyError', err));
  };

  const deleteItem = async ({key: itemId}) => {
    try {
      await apiService.deleteData('/edu', itemId);
      message.success('Deleted succesfully');
      getItems();
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  console.log(items);
  console.log('loading', loading);

  return (
    <>
      <h2>Edu centers</h2>
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
              Refresh
            </Space>
          </Button>
        </Col>
        <Col span={4}>
          <Button block type='primary'>
            Add
          </Button>
        </Col>
      </Row>
      <Spin spinning={loading}>
        <MainTable
          datas={filteredText}
          cols={columns}
          onEdit={editBtn}
          onDelete={deleteItem}
        />
      </Spin>
    </>
  );
};

export default Page1;
