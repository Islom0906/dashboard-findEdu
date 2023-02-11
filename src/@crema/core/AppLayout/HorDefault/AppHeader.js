import React from 'react';
import {Dropdown, Layout, Menu} from 'antd';
import './index.style.less';
import {FiMoreVertical} from 'react-icons/fi';
import AppLogo from '../components/AppLogo';
// import {useIntl} from 'react-intl';
import AppLanguageSwitcher from '../../AppLanguageSwitcher';
import AppHeaderMessages from '../../AppHeaderMessages';
import AppNotifications from '../../AppNotifications';
import NotificationBar from './NotificationBar';
import AppHorizontalNav from '../components/AppHorizontalNav';
import {AiOutlineMenu} from 'react-icons/ai';
import PropTypes from 'prop-types';
import UserInfo from '../components/UserInfo';
import {useSidebarContext} from '../../../utility/AppContextProvider/SidebarContextProvider';

const AppHeader = ({showDrawer}) => {
  const {Header} = Layout;
  // const {Search} = Input;
  // const {messages} = useIntl();
  const {sidebarColorSet} = useSidebarContext();

  const menuMobile = (
    <Menu>
      <AppHeaderMessages />
      <AppNotifications />
      <AppLanguageSwitcher />
    </Menu>
  );

  return (
    <Header className='app-header-hor'>
      <NotificationBar />

      <div className='header-hor-main'>
        <div className='container'>
          <div className='header-hor-main-flex'>
            <a className='trigger' onClick={showDrawer}>
              <AiOutlineMenu />
            </a>
            <AppLogo />
            {/* <Search
              className='header-search-hor'
              placeholder={messages['common.searchHere']}
            /> */}

            <div className='app-header-hor-sectionDesktop'>
              <AppLanguageSwitcher />
              <AppHeaderMessages />
              <AppNotifications />
            </div>
            <UserInfo />
            <div className='app-header-hor-section-mobile'>
              <Dropdown overlay={menuMobile} trigger={['click']}>
                <a
                  className='ant-dropdown-link'
                  onClick={(e) => e.preventDefault()}>
                  <FiMoreVertical />
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>

      <div
        className='header-nav-hor'
        style={{
          backgroundColor: sidebarColorSet.sidebarBgColor,
          color: sidebarColorSet.sidebarTextColor,
        }}>
        <div className='container'>
          <AppHorizontalNav className='app-main-hor-menu' />
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;

AppHeader.propTypes = {
  showDrawer: PropTypes.func,
};
