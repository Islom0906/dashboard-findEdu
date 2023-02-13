import React from 'react';
import PropTypes from 'prop-types';
import {Table, Space, Button, Modal} from 'antd';
import {
  DeleteOutlined,
  EditTwoTone,
  ExclamationCircleTwoTone,
} from '@ant-design/icons';

const MainTable = ({cols, datas, onEdit, onDelete}) => {
  const {confirm} = Modal;

  const showDeleteConfirm = (record) => {
    confirm({
      title: 'Are you sure to delete this?',
      icon: <ExclamationCircleTwoTone twoToneColor='red' />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onDelete(record);
      },
      onCancel() {},
    });
  };

  const columns = [
    ...cols,
    {
      key: cols.length + 1,
      title: 'ACTIONS',
      width: 82,
      fixed: 'right',
      ellipsis: true,
      render: (record) => {
        return (
          <>
            <Space>
              <Button
                icon={<EditTwoTone />}
                onClick={() => onEdit(record)}></Button>
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

  return (
    <>
      <Table columns={columns} dataSource={datas} scroll={{x: true}} />
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
