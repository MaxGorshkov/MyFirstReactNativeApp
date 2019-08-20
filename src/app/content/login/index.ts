import { reduxForm } from 'redux-form';
import { Dumb } from './view';
import { createElement } from 'react';
import { FormModel } from './model';

const Form = reduxForm<FormModel>({
    form: 'loginForm',
    enableReinitialize: true,
  })(Dumb);

export const Login = () => {
    return createElement(Form);
};
