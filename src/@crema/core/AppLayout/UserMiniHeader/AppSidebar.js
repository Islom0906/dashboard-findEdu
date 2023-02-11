import React from 'react';
import collapseMotion from 'antd/lib/_util/motion';
import './index.style.less';
import AppScrollbar from '../../AppScrollbar';
import clsx from 'clsx';
import AppVerticalMenu from '../components/AppVerticalNav';
import {useSidebarContext} from '../../../utility/AppContextProvider/SidebarContextProvider';
import MainSidebar from '../components/MainSidebar';

const AppSidebar = () => {
  const {isSidebarBgImage} = useSidebarContext();

  return (
    <MainSidebar
      className={clsx('userMiniHeader-sidebar', {
        'userMiniHeader-sidebar-img-background': isSidebarBgImage,
      })}
      breakpoint='lg'
      collapsed={collapseMotion}>
      <AppScrollbar
        className='app-sidebar-userMiniHeader-scrollbar'
        scrollToTop={false}>
        <AppVerticalMenu />
      </AppScrollbar>
    </MainSidebar>
  );
};

export default AppSidebar;
