import React from 'react';
import collapseMotion from 'antd/lib/_util/motion';
import './index.style.less';
import UserInfo from '../components/UserInfo';
import AppScrollbar from '../../AppScrollbar';
import clsx from 'clsx';
import AppVerticalMenu from '../components/AppVerticalNav';
import {useSidebarContext} from '../../../utility/AppContextProvider/SidebarContextProvider';
import MainSidebar from '../components/MainSidebar';

const AppSidebar = () => {
  const {isSidebarBgImage} = useSidebarContext();

  return (
    <MainSidebar
      breakpoint='lg'
      className={clsx('mini-sidebar', {
        'mini-sidebar-img-background': isSidebarBgImage,
      })}
      collapsed={collapseMotion}>
      <UserInfo hasColor />
      <AppScrollbar className='app-sidebar-mini-scrollbar' scrollToTop={false}>
        <AppVerticalMenu />
      </AppScrollbar>
    </MainSidebar>
  );
};

export default AppSidebar;
