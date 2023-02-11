import React from 'react';

import PropTypes from 'prop-types';
import {List, Avatar} from 'antd';
import './MessageItem.less';

const MessageItem = (props) => {
  const {item} = props;

  return (
    <List.Item className='message-list-item item-hover'>
      <Avatar className='message-avatar' src={item.image} />
      <div className='message-list-item-content'>
        <h3>{item.name}</h3>
        <p>{item.message}</p>
      </div>
    </List.Item>
  );
};

export default MessageItem;

MessageItem.propTypes = {
  item: PropTypes.object.isRequired,
};
