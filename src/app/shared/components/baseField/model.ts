import { WrappedFieldProps } from 'redux-form';

export type BaseFieldOnBlurEnentHandler = (event: any, formName: string, fieldName: string, newValue?: any) => Promise<void>;

export interface IModel extends WrappedFieldProps {
    label?: string;
    placeholder?: string;
    autoFocus?: boolean;
    type: 'text' | 'password';
    maxLength?: number;
    disabled?: boolean;
    fullWidth?: boolean;
    outlined?: boolean;
    onCustomBlur?: BaseFieldOnBlurEnentHandler;
}
