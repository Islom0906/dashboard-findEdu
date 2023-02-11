import React from 'react';
import {Dropdown, Layout, Menu} from 'antd';
import './index.style.less';
import {FiMoreVertical} from 'react-icons/fi';
// import {useIntl} from 'react-intl';
import AppLanguageSwitcher from '../../AppLanguageSwitcher';
import AppHeaderMessages from '../../AppHeaderMessages';
import AppNotifications from '../../AppNotifications';
import NotificationBar from './NotificationBar';
import {AiOutlineMenu} from 'react-icons/ai';
import PropTypes from 'prop-types';
import AppHorizontalNav from '../components/AppHorizontalNav';
import AppLogo from '../components/AppLogo';
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
    <Header
      className='app-header-hor-dark'
      style={{
        backgroundColor: sidebarColorSet.sidebarBgColor,
        color: sidebarColorSet.sidebarTextColor,
      }}>
      <NotificationBar />

      <div
        className='header-hor-dark-main'
        style={{
          backgroundColor: sidebarColorSet.sidebarBgColor,
          color: sidebarColorSet.sidebarTextColor,
        }}>
        <div className='container'>
          <div className='header-hor-dark-main-flex'>
            <a className='trigger' onClick={showDrawer}>
              <AiOutlineMenu />
            </a>
            <AppLogo hasSidebarColor />
            {/* <Search
              className='header-search-hor-dark'
              placeholder={messages['common.searchHere']}
            /> */}

            <div className='app-header-hor-dark-sectionDesktop'>
              <AppLanguageSwitcher />
              <AppHeaderMessages />
              <AppNotifications />
            </div>
            <UserInfo />
            <div className='app-header-hor-dark-section-mobile'>
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
        className='header-nav-hor-dark'
        style={{
          backgroundColor: sidebarColorSet.sidebarBgColor,
          color: sidebarColorSet.sidebarTextColor,
        }}>
        <div className='container'>
          <AppHorizontalNav className='app-main-hor-dark-menu' />
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;

AppHeader.propTypes = {
  showDrawer: PropTypes.func,
};
