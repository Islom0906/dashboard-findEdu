import React, {useState} from 'react';
import {Layout} from 'antd';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import './index.style.less';
import {AppContentView} from '../../../index';
import AppThemeSetting from '../../AppThemeSetting';
import AppFooter from '../components/AppFooter';
import AppScrollbar from '../../AppScrollbar';
import clsx from 'clsx';
import {FooterType} from '../../../../shared/constants/AppEnums';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider';

const DrawerLayout = () => {
  const [isVisible, setVisible] = useState(false);

  const {footer, footerType} = useLayoutContext();

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <Layout
      className={clsx('app-DrawerLayout', {
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
      })}>
      <AppSidebar visible={isVisible} onClose={onClose} />
      <Layout className='app-DrawerLayout-main'>
        <AppHeader showDrawer={showDrawer} />
        <AppScrollbar className='drawerLayout-main-scrollbar'>
          <AppContentView />
          <AppFooter />
        </AppScrollbar>
      </Layout>
      <AppThemeSetting />
    </Layout>
  );
};

export default React.memo(DrawerLayout);
