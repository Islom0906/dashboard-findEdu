import React, {useEffect} from 'react';
import {Drawer} from 'antd';
import './index.style.less';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import UserInfo from '../components/UserInfo';
import AppScrollbar from '../../AppScrollbar';
import clsx from 'clsx';
import AppVerticalMenu from '../components/AppVerticalNav';
import {ThemeDirection} from '../../../../shared/constants/AppEnums';
import {useSidebarContext} from '../../../utility/AppContextProvider/SidebarContextProvider';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider';
import MainSidebar from '../components/MainSidebar';

const AppSidebar = ({visible, onClose}) => {
  const {isSidebarBgImage} = useSidebarContext();
  const {direction} = useLayoutContext();
  const {pathname} = useLocation();

  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <Drawer
      className='app-hor-header-fixed-drawer'
      placement={direction === ThemeDirection.LTR ? 'left' : 'right'}
      closable={false}
      onClose={onClose}
      visible={visible}>
      <MainSidebar
        className={clsx('app-main-hor-header-fixed-sidebar', {
          'hor-header-fixed-sidebar-img-background': isSidebarBgImage,
        })}
        collapsible>
        <UserInfo />
        <AppScrollbar
          className='app-sidebar-hor-header-fixed-scrollbar'
          scrollToTop={false}>
          <AppVerticalMenu />
        </AppScrollbar>
      </MainSidebar>
    </Drawer>
  );
};

export default AppSidebar;

AppSidebar.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};
