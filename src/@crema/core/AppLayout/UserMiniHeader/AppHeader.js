import React from 'react';
import {Dropdown, Layout, Menu} from 'antd';
import './index.style.less';
import {FiMoreVertical} from 'react-icons/fi';
import AppLogo from '../components/AppLogo';
// import {useIntl} from 'react-intl';
import AppLanguageSwitcher from '../../AppLanguageSwitcher';
import AppHeaderMessages from '../../AppHeaderMessages';
import AppNotifications from '../../AppNotifications';
import UserInfo from '../components/UserInfo';

const AppHeader = () => {
  const {Header} = Layout;
  // const {Search} = Input;
  // const {messages} = useIntl();

  const menuMobile = (
    <Menu>
      <AppHeaderMessages />
      <AppNotifications />
      <AppLanguageSwitcher />
    </Menu>
  );

  return (
    <Header className='app-userMiniHeader'>
      <AppLogo />

      {/* <Search
        className='userMiniHeader-search'
        placeholder={messages['common.searchHere']}
      /> */}
      <div className='app-userMiniHeader-sectionDesktop'>
        <AppLanguageSwitcher />
        <AppHeaderMessages />
        <AppNotifications />
      </div>
      <UserInfo />
      <div className='app-userMiniHeader-section-mobile'>
        <Dropdown overlay={menuMobile} trigger={['click']}>
          <a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
            <FiMoreVertical />
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;

AppHeader.propTypes = {};
