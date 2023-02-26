import React from 'react';

export const samplePagesConfigs = [
  {
    path: '/sample/page-1',
    component: React.lazy(() => import('./Page1')),
  },
  {
    path: '/sample/:page',
    component: React.lazy(() => import('./Template/index.tsx')),
  },
];
