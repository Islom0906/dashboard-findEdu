import React, {useEffect, useMemo, useReducer} from 'react';
import {Avatar,Image,Spin,Row,Col,message,Input,Button,Space,} from 'antd';
import MainTable from '../../../components/Table';

import apiService from 'service/api';
import {CheckCircleTwoTone,CloseCircleTwoTone,EyeOutlined,FileImageOutlined,SyncOutlined} from '@ant-design/icons';
import IntlMessages from '@crema/utility/IntlMessages';
import EduModal from './EduModal';
import { setEditItemId, setLoading, setItems, setVisible, setTitle, setInput } from './ReducerActions';
import { ItemTypes, StateTypes, appActionType, itemType } from '../Types';
import { imageType } from '../Types';
    
  const columns = [
    {
      key: 1,
      dataIndex: 'name_uz',
      title: <IntlMessages id='common.nameUzTitle' />,
      ellipsis: true,
    },
    {
      key: 2,
      dataIndex: 'name_en',
      title: <IntlMessages id='common.nameEnTitle' />,
      ellipsis: true,
    },
    {
      key: 3,
      dataIndex: 'name_ru',
      title: <IntlMessages id='common.nameRuTitle' />,
      ellipsis: true,
    },
    {
      key: 4,
      dataIndex: 'onlineExists',
      title: <IntlMessages id='common.onlineExist' />,
      ellipsis: true,
      render: (val: boolean) => {
        return val ? <CheckCircleTwoTone twoToneColor={"green"} style={{ fontSize: '20px' }} /> : <CloseCircleTwoTone twoToneColor={"red"} style={{ fontSize: '20px' }} />
      }
    },
    {
      key: 5,
      title: <IntlMessages id='common.image' />,
      dataIndex: 'image',
      width: 80,
      ellipsis: true,
      render: (imgUrl: imageType) => {
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
      ellipsis: true,
    },
  ];

  function reducer(state: StateTypes, action: appActionType) {
    switch (action.type) {
      case 'SET_ITEMS':
        return {...state, items: action.payload};
      case 'SET_VISIBLE':
        return {...state, visible: action.payload};
      case 'SET_EDIT_ITEM_ID':
        return {...state, editItemId: action.payload};
      case 'SET_LOADING':
        return {...state, loading: action.payload};
      case 'SET_TITLE':
        return {...state, title: action.payload};
      case 'SET_INPUT':
        return {...state, input: action.payload};
      default:
        return state;
    }
  }

const Page1 = () => {
  const [state, dispatch] = useReducer(reducer, {
    visible: false,
    title: '',
    items: [],
    editItemId: null,
    loading: {table: false, modal: false},
    input: ''
  });

  console.log(state.items);
  

  const getItems = () => {
    dispatch(setLoading({...state.loading, table: true}))
    apiService
      .getData(`/edu`)
      .then((res) => {
        dispatch(setItems(res.data));
      })
      .catch((err) => {
        console.error('MyError', err)
        message.error('Error occured')
      })
      .finally(() => dispatch(setLoading({...state.loading, table: false})))
  };

  const filteredItems = useMemo(
    () =>
      state?.items?.filter(
        (item: itemType) =>
          item.name_en?.toLowerCase()?.includes(state.input) ||
          item.name_ru?.toLowerCase()?.includes(state.input) ||
          item.name_uz?.toLowerCase()?.includes(state.input),
      ),
    [state.input, state.items],
  );

  useEffect(() => {
    getItems();
  }, []);

  const onEdit = (data: ItemTypes) => {
    dispatch(setEditItemId(data?._id))
    dispatch(setTitle('Edit Education Infos'))
    dispatch(setVisible(true))
  }

  const deleteItem = ({_id: id}: {_id: string}) => {
    apiService
      .deleteData(`/edu`, id)
      .then(() => {
        getItems();
        message.success('Deleted succesfully');
      })
      .catch((err) => {
        message.error(err.message, 3);
      });
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
            onChange={(e) =>
              dispatch(setInput(e.target.value.toLowerCase()))
            }
            placeholder='Search...'
          />
        </Col>

        <Col span={3}>
          <Button block onClick={getItems} disabled={state.loading.table}>
            <Space>
              {state.loading.table && <SyncOutlined spin />}
              <IntlMessages id='common.refresh' />
            </Space>
          </Button>
        </Col>

        <Col span={4}>
          <Button
            disabled={state.loading.table}
            block
            type='primary'
            onClick={() => {
              dispatch(setVisible(true))
              dispatch(setTitle('Add Education Infos'))
            }}>
            {state.loading.table && <SyncOutlined spin />}
            <IntlMessages id='common.add' />
          </Button>
        </Col>
        
      </Row>

      <EduModal
        state={state}
        dispatch={dispatch}
        getItems={getItems}
      />
      
      <Spin spinning={state.loading.table}>
        <MainTable
          datas={filteredItems}
          cols={columns}
          onDelete={deleteItem}
          onEdit={onEdit}
        />
      </Spin>
    </>
  );
};

export default Page1;
