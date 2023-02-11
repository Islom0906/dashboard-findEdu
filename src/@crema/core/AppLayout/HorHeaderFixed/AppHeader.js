import React from 'react';
import {Dropdown, Layout, Menu} from 'antd';
import './index.style.less';
import {FiMoreVertical} from 'react-icons/fi';
import AppLogo from '../components/AppLogo';
// import {useIntl} from 'react-intl';
import AppLanguageSwitcher from '../../AppLanguageSwitcher';
import AppHeaderMessages from '../../AppHeaderMessages';
import AppNotifications from '../../AppNotifications';
import {AiOutlineMenu} from 'react-icons/ai';
import PropTypes from 'prop-types';
import AppHorizontalNav from '../components/AppHorizontalNav';
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
      className='app-header-hor-header-fixed'
      style={{
        backgroundColor: sidebarColorSet.sidebarBgColor,
        color: sidebarColorSet.sidebarTextColor,
      }}>
      <div className='header-hor-header-fixed-main'>
        <div className='container'>
          <div className='header-hor-header-fixed-main-flex'>
            <a className='trigger' onClick={showDrawer}>
              <AiOutlineMenu />
            </a>
            <AppLogo hasSidebarColor />
            <AppHorizontalNav className='app-main-hor-header-fixed-menu' />
            {/* <Search
              className='header-search-hor-header-fixed'
              placeholder={messages['common.searchHere']}
            /> */}

            <div className='app-header-hor-header-fixed-sectionDesktop'>
              <AppLanguageSwitcher />
              <AppHeaderMessages />
              <AppNotifications />
            </div>
            <UserInfo />
            <div className='app-header-hor-header-fixed-section-mobile'>
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
    </Header>
  );
};

export default AppHeader;

AppHeader.propTypes = {
  showDrawer: PropTypes.func,
};
