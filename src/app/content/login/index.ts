import { reduxForm, getFormValues, SubmissionError } from 'redux-form';
import { createElement, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { Dumb } from './view';
import { FormModel, IModel, IStateProps } from './model';
import { validationPipe } from '../../shared/pipes';
import { StorageState } from '../../../redux/reducers';
import { Forms, Routes } from '../../shared/constants';
import { login } from '../../../redux/actions/credentials';
import { store } from '../../../app';
import { push } from 'connected-react-router';

const getFormErrors = (formData: FormModel) => validationPipe(formData, [
  {
      names: 'email',
      error: 'Укажите электронную почту',
      type: 'required',
  },
  {
      names: 'password',
      error: 'Укажите пароль',
      type: 'required',
  },
]);

const Form = reduxForm<FormModel, IStateProps>({
    form: 'loginForm',
    enableReinitialize: true,
  })(Dumb);

export const Login = () => {
  const dispatch = useDispatch();

  const stateModel = useSelector<StorageState, IModel>(state => {
    const formModel = getFormValues(Forms.loginForm)(state) as FormModel;
    return {
      token: state.credentials.token,
      formModel,
      isFormValid: () => !getFormErrors(formModel),
    };
  }, shallowEqual);

  const props: IStateProps = {
      ...stateModel,
      onLoginPressed: async () => {
        const submissionError = getFormErrors(stateModel.formModel);
        if (submissionError) {
            throw new SubmissionError(submissionError);
        }

        await dispatch(login(stateModel.formModel));
      }
  };

  useEffect(() => {
      if (props.token) {
          store.dispatch(push(Routes.empty));
      }
  }, [stateModel.token]);

  if (!!props.token) {
      return (null);
  }
  return createElement(Form, props);
};
