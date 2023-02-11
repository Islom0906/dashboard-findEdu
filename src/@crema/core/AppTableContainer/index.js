import React from 'react';
import {Table} from 'antd';
import './index.style.less';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';

const AppTableContainer = (props) => {
  const {columns, data, pagination, hoverColor, className, ...rest} = props;

  return (
    <QueueAnim
      component={Table}
      type='left'
      className={clsx('table-responsive', {hoverColor: hoverColor}, className)}
      columns={columns}
      dataSource={data}
      rowKey='id'
      pagination={pagination}
      {...rest}
    />
  );
};

export default AppTableContainer;

AppTableContainer.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.array,
  className: PropTypes.string,
  pagination: PropTypes.bool,
  hoverColor: PropTypes.bool,
};

AppTableContainer.defaultProps = {
  pagination: false,
};
