import React from 'react';
import { Button as ReactButton, View } from 'react-native';

import { InputProps } from './model';
import { styles } from './style';

export const Button = (props: InputProps) => {
    const { onClick, text } = props;
    return (
        <View style={styles.buttonContainer}>
            <ReactButton color='green' onPress={onClick} title={text}/>
        </View>
    );
};
