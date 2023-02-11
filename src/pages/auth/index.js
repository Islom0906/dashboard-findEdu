import React from 'react';

export const authRouteConfig = [
  {
    path: '/signin',
    component: React.lazy(() => import('./Signin')),
  },
  {
    path: '/signup',
    component: React.lazy(() => import('./Signup')),
  },
  {
    path: '/forget-password',
    component: React.lazy(() => import('./ForgotPassword')),
  },
  {
    path: '/confirm-signup',
    component: React.lazy(() => import('./ConfirmSignupAwsCognito')),
  },
  {
    path: '/reset-password',
    component: React.lazy(() => import('./ResetPasswordAwsCognito')),
  },
];
