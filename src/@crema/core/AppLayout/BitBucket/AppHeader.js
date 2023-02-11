import React from 'react';
import {Layout} from 'antd';
import './index.style.less';
import AppLogo from '../components/AppLogo';
// import {useIntl} from 'react-intl';
import PropTypes from 'prop-types';
import {AiOutlineMenu} from 'react-icons/ai';

const AppHeader = ({showDrawer}) => {
  const {Header} = Layout;
  // const {Search} = Input;
  // const {messages} = useIntl();

  return (
    <Header className='app-BitBucket-header'>
      <a className='trigger' onClick={showDrawer}>
        <AiOutlineMenu />
      </a>
      <AppLogo />
      {/* <Search
        className='bitBucket-header-search'
        placeholder={messages['common.searchHere']}
      /> */}
    </Header>
  );
};

export default AppHeader;

AppHeader.propTypes = {
  showDrawer: PropTypes.func,
};
