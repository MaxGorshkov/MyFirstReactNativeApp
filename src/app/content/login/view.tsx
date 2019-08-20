import * as React from 'react';
import { Field } from 'redux-form';
import { View } from 'react-native';

import { styles } from './style';
import { BaseField } from '../../shared/components/baseField';



export const Dumb = () => {
    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.content}>
                    <Field
                        component={BaseField}
                        name='username'
                        placeholder='username'
                        type='text'
                        onCustomBlur={(event: any, formName: string, fieldName: string, newValue?: any) =>
                            console.log(`onCustomBlur form ${formName} field ${fieldName} = `, newValue)}
                    />
                    <Field
                        component={BaseField}
                        name='password'
                        placeholder='password'
                        type='password'
                        onCustomBlur={(event: any, formName: string, fieldName: string, newValue?: any) =>
                            console.log(`onCustomBlur form ${formName} field ${fieldName} = `, newValue)}
                    />
                </View>
            </View>
        </View>
    );
};
