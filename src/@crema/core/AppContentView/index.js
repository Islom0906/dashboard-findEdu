import React from 'react';
import {Layout} from 'antd';
import {AppSuspense} from '../../index';
import {
  anonymousStructure,
  authorizedStructure,
  unAuthorizedStructure,
} from '../../../pages';
import AppErrorBoundary from '../AppErrorBoundary';
import './index.style.less';
import generateRoutes from '../../utility/RouteGenerator';
import {useAuthUser} from '../../utility/AuthHooks';
import {Route, Switch} from 'react-router-dom';
import Error404 from '../../../pages/errorPages/Error404';

const {Content} = Layout;

const AppContentView = () => {
  const {user, isAuthenticated} = useAuthUser();
  return (
    <Content className='main-content-view'>
      <AppSuspense>
        <AppErrorBoundary>
          <Switch>
            {generateRoutes({
              isAuthenticated: isAuthenticated,
              userRole: user?.role,
              unAuthorizedStructure,
              authorizedStructure,
              anonymousStructure,
            })}
            <Route path='/'>
              <Error404 />
            </Route>
          </Switch>
        </AppErrorBoundary>
      </AppSuspense>
    </Content>
  );
};

export default AppContentView;
