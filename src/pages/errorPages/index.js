import React from 'react';

export const errorPagesConfigs = [
  {
    path: '/extra-pages/error-pages/error-401',
    component: React.lazy(() => import('./Error401')),
  },
  {
    path: '/extra-pages/error-pages/error-403',
    component: React.lazy(() => import('./Error403')),
  },
  {
    path: '/extra-pages/error-pages/error-404',
    component: React.lazy(() => import('./Error404')),
  },
  {
    path: '/extra-pages/error-pages/error-500',
    component: React.lazy(() => import('./Error500')),
  },
  {
    path: '/extra-pages/error-pages/coming-soon',
    component: React.lazy(() => import('./ComingSoon')),
  },
  {
    path: '/extra-pages/error-pages/maintenance',
    component: React.lazy(() => import('./Maintenance')),
  },
];
