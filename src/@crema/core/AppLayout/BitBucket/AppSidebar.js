import React, {useEffect, useState} from 'react';
import {Drawer} from 'antd';
import './index.style.less';
import PropTypes from 'prop-types';
import UserInfo from '../components/UserInfo';
import AppScrollbar from '../../AppScrollbar';
import clsx from 'clsx';
import BucketMinibar from './BucketMinibar';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';
import AppVerticalMenu from '../components/AppVerticalNav';
import {useLocation} from 'react-router-dom';
import {ThemeDirection} from '../../../../shared/constants/AppEnums';
import {useSidebarContext} from '../../../utility/AppContextProvider/SidebarContextProvider';
import MainSidebar from '../components/MainSidebar';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider';

const AppSidebar = ({visible, onClose}) => {
  const {isSidebarBgImage} = useSidebarContext();
  const {direction} = useLayoutContext();
  const {pathname} = useLocation();

  useEffect(() => {
    onClose();
  }, [pathname]);

  const [isSidebarClosed, setSidebarClosed] = useState(false);

  const onSidebarClosed = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  const sideBarComponent = () => {
    return (
      <MainSidebar
        className={clsx('app-BitBucket-sidebar', {
          'bitBucket-sidebar-img-background': isSidebarBgImage,
        })}
        collapsible>
        <UserInfo hasColor />
        <AppScrollbar
          className='app-BitBucket-sidebar-scrollbar'
          scrollToTop={false}>
          <AppVerticalMenu />
        </AppScrollbar>
      </MainSidebar>
    );
  };

  return (
    <>
      <Drawer
        className='app-BitBucket-drawer'
        placement={direction === ThemeDirection.LTR ? 'left' : 'right'}
        closable={false}
        onClose={onClose}
        visible={visible}>
        <div className='app-BitBucket-sidebar-wrapper'>
          <BucketMinibar />
          {sideBarComponent()}
        </div>
      </Drawer>
      <div
        className={clsx('app-BitBucket-sidebar-wrapper', {
          'app-BitBucket-sidebar-wrapper-close': isSidebarClosed,
        })}>
        <BucketMinibar />
        {sideBarComponent()}
        <a className='bitbucket-btn' onClick={onSidebarClosed}>
          {isSidebarClosed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
        </a>
      </div>
    </>
  );
};

export default AppSidebar;

AppSidebar.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};
