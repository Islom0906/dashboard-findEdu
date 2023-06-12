import React from 'react';
import PropTypes from 'prop-types';
import {Table, Space, Button, Modal} from 'antd';
import {
  DeleteOutlined,
  EditTwoTone,
  ExclamationCircleTwoTone,
} from '@ant-design/icons';
import IntlMessages from '@crema/utility/IntlMessages';

const MainTable = ({cols, datas, ...otherProps}) => {
  // onDelete va onEdit function props qo'shsa boladi

  const {confirm} = Modal;

  const showDeleteConfirm = (record) => {
    confirm({
      title: 'Are you sure to delete this?',
      icon: <ExclamationCircleTwoTone twoToneColor='red' />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        otherProps.onDelete(record);
      },
      onCancel() {},
    });
  };

  const columns = [
    ...cols,
    {
      key: cols.length + 1,
      title: <IntlMessages id='common.actions' />,
      width: 82,
      fixed: 'right',
      ellipsis: true,
      render: (record) => {
        return (
          <>
            <Space>
              <Button
                icon={<EditTwoTone />}
                onClick={() => otherProps.onEdit(record)}></Button>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => showDeleteConfirm(record)}></Button>
            </Space>
          </>
        );
      },
    },
  ];

  if(otherProps.default) {
    columns.pop()
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={datas}
        scroll={{x: true}}
        {...otherProps}
      />
    </>
  );
};

MainTable.propTypes = {
  cols: PropTypes.array,
  datas: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default MainTable;
