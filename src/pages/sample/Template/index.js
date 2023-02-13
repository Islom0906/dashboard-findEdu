import {SyncOutlined} from '@ant-design/icons';
import {Button, Col, Input, message, Row, Space, Spin} from 'antd';
import axios from 'axios';
import MainTable from 'components/Table';
import React, {useEffect, useMemo, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import PostEdit from './PostEdit';

const Page2 = () => {
  const {state} = useLocation();
  const {page} = useParams();
  const [items, setItems] = useState(() => []);
  const [visible, setVisible] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [input, setInput] = useState(() => []);
  const [loading, setLoading] = useState(() => {
    return {table: false, modal: false};
  });

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.name_En?.toLowerCase().includes(input) ||
          item.name_Ru?.toLowerCase().includes(input) ||
          item.name_Uz?.toLowerCase().includes(input),
      ),
    [input, items],
  );

  const getItems = () => {
    setItems([]);
    setLoading((prev) => {
      return {...prev, table: true};
    });
    axios.get(`http://18.216.178.179/api/v1/${page}`).then((res) => {
      setLoading((prev) => {
        return {...prev, table: false};
      });
      setItems(res.data.data);
    });
  };
  const deleteItem = ({_id: id}) => {
    setLoading((prev) => {
      return {...prev, table: true};
    });
    axios
      .delete(`http://18.216.178.179/api/v1/${page}/${id}`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGUxYmU1MjNiNWZhYmM1YjUxYjc5ZCIsImlhdCI6MTY3NTYwNTUyMywiZXhwIjoxNjgzMzgxNTIzfQ.pEUX_SAIUZ2qjmPLpKz4TvXCOuyln_O84hXyNWQpn_c',
        },
      })
      .then(() => {
        getItems();
        message.success('Deleted succesfully');
      })
      .catch((err) => {
        console.dir(err);
        message.error(err.message, 3);
        setLoading((prev) => {
          return {...prev, modal: false};
        });
      });
  };

  const editBtn = (item) => {
    setEditItem(item);
    setVisible(true);
  };

  useEffect(() => {
    getItems();
  }, [page]);
  const columns = [
    {key: 1, dataIndex: 'name_Uz', title: 'Name uz'},
    {key: 2, dataIndex: 'name_En', title: 'Name en'},
    {key: 3, dataIndex: 'name_Ru', title: 'Name ru'},
    {
      key: 4,
      title: 'Image',
      dataIndex: 'photo',
      render: (text) => {
        return !text ? (
          ''
        ) : (
          <img
            src={`http://18.216.178.179/api/v1/img/${text}`}
            style={{height: 40, width: 40, objectFit: 'cover'}}
          />
        );
      },
      // width: 80,
    },
    // {
    //   key: 4,
    //   title: 'Actions',
    //   render(item) {
    //     return (
    //       <Space>
    //         <Button ghost type='primary' onClick={() => editBtn(item)}>
    //           Edit
    //         </Button>
    //         <Button danger onClick={() => handleDelete(item._id)}>
    //           Delete
    //         </Button>
    //       </Space>
    //     );
    //   },
    // },
  ];
  console.log(editItem);

  return (
    <>
      <h2>{state.title} list</h2>

      <Row gutter={12}>
        <Col span={17}>
          <Input
            size='large'
            placeholder='Search...'
            onChange={(e) => setInput(e.target.value.toLowerCase())}></Input>
        </Col>
        <Col span={3}>
          <Button block onClick={getItems} disabled={loading.table}>
            <Space>
              {loading.table ? <SyncOutlined spin /> : ''}
              Refresh
            </Space>
          </Button>
        </Col>
        <Col span={4}>
          <Button block type='primary' onClick={() => setVisible(true)}>
            Add
          </Button>
        </Col>
      </Row>
      <Spin spinning={loading.table}>
        <MainTable
          datas={filteredItems}
          cols={columns}
          onEdit={editBtn}
          onDelete={deleteItem}
        />
      </Spin>
      <PostEdit
        title={state.title}
        loading={loading}
        page={page}
        setLoading={setLoading}
        setVisible={setVisible}
        visible={visible}
        getItems={getItems}
        editItem={editItem}
        setEditItem={setEditItem}></PostEdit>
    </>
  );
};

export default Page2;
