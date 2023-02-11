import {Link, useLocation} from 'react-router-dom';
import {Menu} from 'antd';
import React from 'react';
import routesConfig from '../../pages/routeConfig';
import {useIntl} from 'react-intl';
import {useSidebarContext} from './AppContextProvider/SidebarContextProvider';

function getStyles(item, sidebarColorSet, index) {
  const {pathname} = useLocation();
  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/');

  const isOpen = defaultOpenKeys[index] === item.id;
  return {
    color: isOpen
      ? sidebarColorSet.sidebarMenuSelectedTextColor
      : sidebarColorSet.sidebarTextColor,
    backgroundColor: isOpen
      ? sidebarColorSet.sidebarMenuSelectedBgColor
      : sidebarColorSet.sidebarBgColor,
  };
}

const renderMenuItemChildren = (item) => {
  const {icon, messageId, path} = item;
  const {messages} = useIntl();

  if (path && path.includes('/'))
    return (
      <Link to={path}>
        {icon &&
          (React.isValidElement(icon) ? (
            <span className='ant-menu-item-icon'>{icon}</span>
          ) : (
            <icon className='ant-menu-item-icon' />
          ))}
        <span data-testid={messageId.toLowerCase + '-nav'}>
          {messages[messageId]}
        </span>
      </Link>
    );
  else {
    return (
      <>
        {icon &&
          (React.isValidElement(icon) ? (
            <span className='ant-menu-item-icon'>{icon}</span>
          ) : (
            <icon className='ant-menu-item-icon' />
          ))}
        <span data-testid={messageId.toLowerCase + '-nav'}>
          {messages[messageId]}
        </span>
      </>
    );
  }
};

const renderMenuItem = (item, sidebarColorSet, index) => {
  return item.type === 'collapse' ? (
    <Menu.SubMenu
      style={getStyles(item, sidebarColorSet, index, true)}
      key={item.path ? item.path : item.id}
      title={renderMenuItemChildren(item, sidebarColorSet)}>
      {item.children.map((item) =>
        renderMenuItem(item, sidebarColorSet, index + 1),
      )}
    </Menu.SubMenu>
  ) : (
    <Menu.Item key={item.id} style={getStyles(item, sidebarColorSet, index)}>
      {item.children
        ? item.children
        : renderMenuItemChildren(item, sidebarColorSet)}
    </Menu.Item>
  );
};

const renderHorMenu = (item, sidebarColorSet, index) => {
  return item.type === 'group' ? (
    <Menu.SubMenu
      style={getStyles(item, sidebarColorSet, index, true)}
      key={item.path ? item.path : item.id}
      title={renderMenuItemChildren(item, sidebarColorSet)}>
      {item.children.map((item) =>
        renderMenuItem(item, sidebarColorSet, index + 1),
      )}
    </Menu.SubMenu>
  ) : (
    <Menu.Item
      key={item.id}
      exact={item.exact}
      style={getStyles(item, sidebarColorSet, index, true)}>
      {item.children
        ? item.children
        : renderMenuItemChildren(item, sidebarColorSet)}
    </Menu.Item>
  );
};

export const getRouteHorMenus = () => {
  const {sidebarColorSet} = useSidebarContext();
  return routesConfig.map((route) => renderHorMenu(route, sidebarColorSet, 0));
};
