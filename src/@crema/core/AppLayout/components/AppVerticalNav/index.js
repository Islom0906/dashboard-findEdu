import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Menu} from 'antd';
import {getRouteMenus} from '../../../../utility/VerticalMenuUtils';
import clsx from 'clsx';
import './index.style.less';
import defaultConfig from '../../../../utility/AppContextProvider/defaultConfig';
import {useSidebarContext} from '../../../../utility/AppContextProvider/SidebarContextProvider';
import {MenuStyle} from '../../../../../shared/constants/AppEnums';

const AppVerticalNav = () => {
  const {menuStyle, sidebarColorSet} = useSidebarContext();
  const {pathname} = useLocation();
  const selectedKeys = pathname.substr(1).split('/');
  const defaultOpenKeys = selectedKeys[0];
  const [openKeys, setOpenKeys] = useState([defaultOpenKeys]);

  useEffect(() => {
    setOpenKeys([selectedKeys[selectedKeys.length - 2]]);
  }, []);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  return (
    <Menu
      theme={sidebarColorSet.mode}
      mode='inline'
      className={clsx('app-main-sidebar-menu ', {
        'menu-rounded': menuStyle === MenuStyle.ROUNDED,
        'menu-rounded rounded-menu-reverse':
          menuStyle === MenuStyle.ROUNDED_REVERSE,
        'menu-rounded standard-menu': menuStyle === MenuStyle.STANDARD,
        'menu-rounded curved-menu': menuStyle === MenuStyle.CURVED_MENU,
        'bg-color-menu':
          sidebarColorSet.sidebarBgColor !==
          defaultConfig.sidebar.colorSet.sidebarBgColor,
      })}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      selectedKeys={[selectedKeys[selectedKeys.length - 1]]}>
      {getRouteMenus(selectedKeys)}
    </Menu>
  );
};

export default AppVerticalNav;
