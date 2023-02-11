import React, {useEffect, useState} from 'react';
import {Grid, Layout} from 'antd';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import './index.style.less';
import {AppContentView} from '../../../index';
import AppThemeSetting from '../../AppThemeSetting';
import AppFooter from '../components/AppFooter';
import AppScrollbar from '../../AppScrollbar';
import clsx from 'clsx';
import {FooterType} from '../../../../shared/constants/AppEnums';
import {isEmpty} from '../../../utility/GlobalHelper';
import {useLayoutContext} from '../../../utility/AppContextProvider/LayoutContextProvider';

const {useBreakpoint} = Grid;

const Default = () => {
  const width = useBreakpoint();
  const [isCollapsed, setCollapsed] = useState(false);
  const {footer, footerType} = useLayoutContext();

  const onToggleSidebar = () => {
    setCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (!isEmpty(width)) {
      if (width.xl) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    }
  }, [width]);

  return (
    <Layout
      className={clsx('app-layout', {
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
      })}>
      <AppSidebar isCollapsed={isCollapsed} />
      <Layout className='app-layout-main'>
        <AppHeader
          isCollapsed={isCollapsed}
          onToggleSidebar={onToggleSidebar}
        />
        <AppScrollbar className='main-scrollbar'>
          <AppContentView />
          <AppFooter />
        </AppScrollbar>
      </Layout>
      <AppThemeSetting />
    </Layout>
  );
};

export default React.memo(Default);
