import React from 'react';

import PropTypes from 'prop-types';
import {List, Avatar} from 'antd';
import './NotificationItem.less';

const NotificationItem = (props) => {
  const {item} = props;
  return (
    <List.Item className='notify-listItem item-hover'>
      <List.Item.Meta
        avatar={
          <Avatar
            className='notify-message-avatar'
            src={item.image}
            alt={item.name}
          />
        }
        title={item.name}
        description={item.message}
      />
    </List.Item>
  );
};

export default NotificationItem;

NotificationItem.propTypes = {
  item: PropTypes.object.isRequired,
};
