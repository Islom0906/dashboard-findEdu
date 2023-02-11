import React from 'react';
import {Layout} from 'antd';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import './index.style.less';
import {AppContentView} from '../../../index';
import AppScrollbar from '../../AppScrollbar';
import AppThemeSetting from '../../AppThemeSetting';
import clsx from 'clsx';
import {FooterType, LayoutType} from '../../../../shared/constants/AppEnums';
import AppFooter from '../components/AppFooter';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider';

const MiniSidebar = () => {
  const {footer, layoutType, footerType} = useLayoutContext();

  return (
    <Layout
      className={clsx('app-layout-mini', {
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
        boxedLayout: layoutType === LayoutType.BOXED,
      })}>
      <AppSidebar />
      <Layout className='app-layout-mini-main'>
        <AppHeader />
        <AppScrollbar className='main-mini-scrollbar'>
          <AppContentView />
          <AppFooter />
        </AppScrollbar>
      </Layout>
      <AppThemeSetting />
    </Layout>
  );
};

export default MiniSidebar;
