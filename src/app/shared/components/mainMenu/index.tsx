import * as React from 'react';
import { ButtonGroup } from 'react-native-elements';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import useReactRouter from 'use-react-router';

import { Routes } from '../../constants';

export const MainMenu = () => {
    const dispatch = useDispatch();
    const { location } = useReactRouter();

    const menuItems = [
        {
            path: Routes.empty,
            component: () => <Text>Home</Text>,
        },
        {
            path: Routes.login,
            component: () => <Text>Login</Text>,
        },
        {
            path: Routes.profile,
            component: () => <Text>Profile</Text>,
        },
    ];

    const selectedIndex = menuItems.findIndex(item => location.pathname === item.path);

    return (
        <ButtonGroup
            onPress={(index) => {
                dispatch(push(menuItems[index].path));
            }}
            selectedIndex={selectedIndex}
            buttons={menuItems.map(item => ({element: item.component}))}
        />
    );
};
