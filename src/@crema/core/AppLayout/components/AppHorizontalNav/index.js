import React from 'react';
import {Menu} from 'antd';
import {useLocation} from 'react-router-dom';
import {getRouteHorMenus} from '../../../../utility/HorizontalMenuUtils';
import PropTypes from 'prop-types';
import './index.style.less';

const AppHorizontalNav = ({className}) => {
  const {pathname} = useLocation();

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[0];
  return (
    <Menu
      mode='horizontal'
      className={className}
      defaultOpenKeys={[defaultOpenKeys]}
      selectedKeys={[selectedKeys.replaceAll('/', ':')]}>
      {getRouteHorMenus()}
    </Menu>
  );
};

export default AppHorizontalNav;
AppHorizontalNav.propTypes = {
  className: PropTypes.string,
};
