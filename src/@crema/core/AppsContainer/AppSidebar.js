import React from 'react';
import PropTypes from 'prop-types';
import {Card, Drawer} from 'antd';
import './index.style.less';
import {ThemeDirection} from '../../../shared/constants/AppEnums';
import {useLayoutContext} from '../../utility/AppContextProvider/LayoutContextProvider';

const AppSidebar = (props) => {
  const {isAppDrawerOpen, setAppDrawerOpen, sidebarContent} = props;
  const {direction} = useLayoutContext();

  return (
    <div className='apps-sidebar'>
      <Drawer
        closeIcon={null}
        placement={direction === ThemeDirection.LTR ? 'left' : 'right'}
        visible={isAppDrawerOpen}
        onClose={() => setAppDrawerOpen(!isAppDrawerOpen)}
        className='apps-sidebar-drawer'>
        {sidebarContent}
      </Drawer>
      <Card className='apps-sidebar-card'>{sidebarContent}</Card>
    </div>
  );
};

export default AppSidebar;
AppSidebar.propTypes = {
  footer: PropTypes.node,
  setAppDrawerOpen: PropTypes.func,
  sidebarContent: PropTypes.node,
  isAppDrawerOpen: PropTypes.bool,
  fullView: PropTypes.bool,
};
