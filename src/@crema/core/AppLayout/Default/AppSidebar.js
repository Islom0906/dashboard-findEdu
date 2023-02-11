import React from 'react';
import './index.style.less';
import PropTypes from 'prop-types';
import UserInfo from '../components/UserInfo';
import AppScrollbar from '../../AppScrollbar';
import clsx from 'clsx';
import AppVerticalMenu from '../components/AppVerticalNav';
import {useSidebarContext} from '../../../utility/AppContextProvider/SidebarContextProvider';
import MainSidebar from '../components/MainSidebar';

const AppSidebar = ({isCollapsed}) => {
  const {isSidebarBgImage} = useSidebarContext();

  return (
    <MainSidebar
      className={clsx('app-main-sidebar', {
        'sidebar-img-background': isSidebarBgImage,
      })}
      collapsible
      breakpoint='xl'
      collapsed={isCollapsed}>
      <UserInfo hasColor />
      <AppScrollbar className='app-sidebar-scrollbar' scrollToTop={false}>
        <AppVerticalMenu />
      </AppScrollbar>
    </MainSidebar>
  );
};

export default AppSidebar;

AppSidebar.propTypes = {
  isCollapsed: PropTypes.bool,
};
