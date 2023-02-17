import {EyeOutlined, FileImageOutlined, SyncOutlined} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Image,
  Input,
  message,
  Row,
  Space,
  Spin,
} from 'antd';
import MainTable from 'components/Table';
import React, {useEffect, useMemo, useReducer} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import PostEdit from './PostEdit';
import apiService from 'service/api';
import {
  setEditItemId,
  setInput,
  setItems,
  setLoading,
  setVisible,
} from './ReducerActions';
import IntlMessages from '@crema/utility/IntlMessages';

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ITEMS':
      return {...state, items: action.payload};
    case 'SET_VISIBLE':
      return {...state, visible: action.payload};
    case 'SET_EDIT_ITEM_ID':
      return {...state, editItemId: action.payload};
    case 'SET_LOADING':
      return {...state, loading: action.payload};
    case 'SET_INPUT':
      return {...state, input: action.payload};
    default:
      return state;
  }
}

const Page2 = () => {
  const [state, dispatch] = useReducer(reducer, {
    visible: false,
    editItemId: '',
    input: '',
    loading: {table: false, modal: false},
    items: [],
  });
  const {state: linkState} = useLocation();
  const {page} = useParams();

  const filteredItems = useMemo(
    () =>
      state.items.filter(
        (item) =>
          item.name_En?.toLowerCase().includes(state.input) ||
          item.name_Ru?.toLowerCase().includes(state.input) ||
          item.name_Uz?.toLowerCase().includes(state.input),
      ),
    [state.input, state.items],
  );

  const getItems = () => {
    dispatch(setItems([]));
    dispatch(setLoading({...state.loading, table: true}));

    apiService.getData(`/${page}`).then((res) => {
      dispatch(setLoading({...state.loading, table: false}));
      dispatch(setItems(res.data));
    });
  };
  const deleteItem = ({_id: id}) => {
    apiService
      .deleteData(`/${page}`, id)
      .then(() => {
        getItems();
        message.success('Deleted succesfully');
      })
      .catch((err) => {
        message.error(err.message, 3);
        dispatch(setLoading({...state.loading, modal: false}));
      });
  };

  const editBtn = (item) => {
    dispatch(setEditItemId(item._id));
    dispatch(setVisible(true));
  };

  useEffect(() => {
    getItems();
  }, [page]);

  const columns = [
    {
      key: 1,
      dataIndex: 'name_Uz',
      title: <IntlMessages id='common.nameUzTitle' />,
    },
    {
      key: 2,
      dataIndex: 'name_En',
      title: <IntlMessages id='common.nameEnTitle' />,
    },
    {
      key: 3,
      dataIndex: 'name_Ru',
      title: <IntlMessages id='common.nameRuTitle' />,
    },
    {
      key: 4,
      title: <IntlMessages id='common.image' />,
      dataIndex: 'photo',
      width: 80,
      render: (imgUrl) => {
        return imgUrl && imgUrl !== 'undefined' ? (
          <Image
            src={`http://18.216.178.179/api/v1/img/${imgUrl}`}
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
  ];

  return (
    <>
      <h2>{linkState.title} list</h2>

      <Row gutter={12}>
        <Col span={16}>
          <Input
            size='large'
            placeholder='Search...'
            onChange={(e) =>
              dispatch(setInput(e.target.value.toLowerCase()))
            }></Input>
        </Col>
        <Col span={4}>
          <Button block onClick={getItems} disabled={state.loading.table}>
            <Space>
              {state.loading.table ? <SyncOutlined spin /> : ''}
              <IntlMessages id='common.refresh' />
            </Space>
          </Button>
        </Col>
        <Col span={4}>
          <Button
            block
            type='primary'
            onClick={() => {
              dispatch(setEditItemId(''));
              dispatch(setVisible(true));
            }}>
            <IntlMessages id='common.add' />
          </Button>
        </Col>
      </Row>
      <Spin spinning={state.loading.table}>
        <MainTable
          datas={filteredItems}
          cols={columns}
          onEdit={editBtn}
          onDelete={deleteItem}
        />
      </Spin>
      <PostEdit
        title={linkState.title}
        page={page}
        getItems={getItems}
        state={state}
        dispatch={dispatch}></PostEdit>
    </>
  );
};

export default Page2;
