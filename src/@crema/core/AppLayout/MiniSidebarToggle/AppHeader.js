import React from 'react';
import {Dropdown, Layout, Menu} from 'antd';
import './index.style.less';
import {AiOutlineMenuFold, AiOutlineMenuUnfold} from 'react-icons/ai';
import PropTypes from 'prop-types';
import AppLogo from '../components/AppLogo';
// import {useIntl} from 'react-intl';
import AppLanguageSwitcher from '../../AppLanguageSwitcher';
import AppHeaderMessages from '../../AppHeaderMessages';
import AppNotifications from '../../AppNotifications';
import {FiMoreVertical} from 'react-icons/fi';

const AppHeader = ({isCollapsed, onToggleSidebar}) => {
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
    <Header className='app-header-mini-sidebar'>
      {React.createElement(
        isCollapsed ? AiOutlineMenuUnfold : AiOutlineMenuFold,
        {
          className: 'trigger',
          onClick: onToggleSidebar,
        },
      )}
      <AppLogo />

      {/* <Search
        className='header-search-mini-sidebar'
        placeholder={messages['common.searchHere']}
      /> */}
      <div className='app-header-mini-sidebar-sectionDesktop'>
        <AppLanguageSwitcher />
      </div>
      <div className='app-header-mini-sidebar-section-mobile'>
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

AppHeader.propTypes = {
  isCollapsed: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
};
