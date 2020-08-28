import React from 'react';
import { AUTH_LAYOUT } from './utils/constants/layouts';
import { HOME, MAIN, SIGN_IN, SIGN_UP } from './utils/constants/routes';
import { SignIn } from './containers/auth/SignIn/SignIn';
import { SignUp } from './containers/auth/Register/SignUp';
import { UserPage } from './components/UserPage/UserPage';
import { Landing } from './containers/Landing';
import { EmailLink } from './containers/auth/EmailLink/EmailLink';

export interface ISingleRoute {
  path: string;
  component: React.ComponentType;
  layout?: string;
  isPrivate?: boolean;
}

export type routesType = Array<ISingleRoute>;

const routes: routesType = [
  {
    path: MAIN,
    component: Landing,
  },
  {
    path: SIGN_IN,
    component: SignIn,
    layout: AUTH_LAYOUT,
  },
  {
    path: SIGN_UP,
    component: SignUp,
    layout: AUTH_LAYOUT,
  },
  {
    path: HOME,
    component: UserPage,
    isPrivate: true,
  },
  {
    path: '/confirm',
    component: EmailLink,
    layout: AUTH_LAYOUT
  },
];

export const landingRoute = routes.find(route => route.path === MAIN);

export default routes;
