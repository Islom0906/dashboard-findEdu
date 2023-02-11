import React from 'react';
import notification from '../../services/db/notifications/notification';
import {List, Button, Dropdown, Menu} from 'antd';

import AppScrollbar from '../AppScrollbar';
import IntlMessages from '../../utility/IntlMessages';
import NotificationItem from './NotificationItem';
import './index.style.less';
import {IoIosNotificationsOutline} from 'react-icons/io';

const AppNotifications = () => {
  const menu = (
    <Menu className='notify-header-message'>
      <Menu.Item className='header'>
        <IntlMessages id='common.notifications' />({notification.length})
      </Menu.Item>
      <Menu.Item>
        <AppScrollbar className='notify-scroll-submenu'>
          <List
            className='notify-list'
            dataSource={notification}
            renderItem={(item) => {
              return <NotificationItem key={item.id} item={item} />;
            }}
          />
        </AppScrollbar>
      </Menu.Item>
      <Menu.Item>
        <Button type='primary' className='notify-btn-all'>
          <IntlMessages id='common.viewAll' />
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} className='dropdown' trigger={['click']}>
      <a className='notify-link' onClick={(e) => e.preventDefault()}>
        <span className='notify-icon'>
          <IoIosNotificationsOutline />
        </span>
        <span className='notify-text'>
          <IntlMessages id='common.notifications' />
        </span>
      </a>
    </Dropdown>
  );
};

export default AppNotifications;
