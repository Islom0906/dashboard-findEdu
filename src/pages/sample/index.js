import React from 'react';

export const samplePagesConfigs = [
  {
    path: '/sample/page-1',
    component: React.lazy(() => import('./Page1/index.tsx')),
  },
  {
    path: '/sample/reviews',
    component: React.lazy(() => import('./Reviews/index.tsx'))
  },
  {
    path: '/sample/:page',
    component: React.lazy(() => import('./Template/index.tsx')),
  },
];
