import * as React from 'react';

import { View } from 'react-native';

export interface InputModel {
    close?: string;
    header?: string;
    show?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    onHide: () => void;
    children?: Element;
}

export const Modal = (props: InputModel) => {

    return (
        <View>TODO: I'm a modal</View>
    );
};
