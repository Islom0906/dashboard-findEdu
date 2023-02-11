import React from 'react';
import messages from '../../services/db/messages/messages';
import MessageItem from './MessageItem';
import IntlMessages from '../../utility/IntlMessages';

import {Button, Dropdown, List, Menu} from 'antd';
import AppScrollbar from '../AppScrollbar';
import './index.style.less';
import {AiOutlineMail} from 'react-icons/ai';

const AppHeaderMessages = () => {
  const menu = (
    <Menu className='header-message'>
      <Menu.Item className='header'>
        <IntlMessages id='dashboard.messages' />({messages.length})
      </Menu.Item>
      <Menu.Item>
        <AppScrollbar className='header-message-scroll-submenu'>
          <List
            dataSource={messages}
            renderItem={(item) => {
              return <MessageItem key={item.id} item={item} />;
            }}
          />
        </AppScrollbar>
      </Menu.Item>
      <Menu.Item>
        <Button className='header-message-btn' type='primary'>
          <IntlMessages id='common.viewAll' />
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <a className='header-message-link' onClick={(e) => e.preventDefault()}>
          <span className='header-message-icon'>
            <AiOutlineMail />
          </span>
          <span className='header-message-link-text'>
            <IntlMessages id='dashboard.messages' />
          </span>
        </a>
      </Dropdown>
    </>
  );
};

export default AppHeaderMessages;
