import * as React from 'react';
import { TextInput, View, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

import { IModel } from './model';

export const Dumb = (props: IModel) => {
    const { type, placeholder, input, autoFocus, disabled, meta, onCustomBlur } = props;

    // const error: boolean = (meta.touched && !!meta.error);

    return (
        <View>
            {
                ['text', 'password'].indexOf(type) !== -1 &&
                <TextInput
                    style={{height: 30}}
                    placeholder={placeholder}
                    {...input}
                    onFocus={input.onFocus as any}
                    secureTextEntry={type === 'password'}
                    autoFocus={autoFocus}
                    editable={!disabled}
                    onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
                        if (onCustomBlur) {
                            const value = e.nativeEvent.text;
                            onCustomBlur(null, meta.form, input.name, value);
                        }
                    }}
                />
            }
        </View>
    );
};
