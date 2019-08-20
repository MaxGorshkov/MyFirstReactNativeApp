import { renderRoutes, RouteConfig } from 'react-router-config';
import { Routes } from '../shared/constants';
import { Login } from '../content/login';
import { Profile } from '../content/profile';
import { Home } from '../content/home';

const baseRoutes: RouteConfig[] = [
    {
        path: Routes.login,
        component: Login,
    },
    {
        path: Routes.profile,
        component: Profile,
    },
    {
        path: Routes.empty,
        component: Home,
    },
];

export const Content = renderRoutes(baseRoutes);
