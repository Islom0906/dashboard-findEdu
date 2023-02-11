import React from 'react';

export const profileConfig = [
  {
    path: '/extra-pages/user-profile',
    component: React.lazy(() => import('./UserProfile')),
  },
];
