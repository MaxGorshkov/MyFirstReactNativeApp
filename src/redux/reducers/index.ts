import { combineReducers } from 'redux';
import { reducer as formReducer, FormStateMap } from 'redux-form';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

import { httpWrapper, HttpWrapperState } from './httpWrapper';

import { credentials, CredentialsState } from './credentials';

export interface StorageState {
    credentials: CredentialsState;
    form: FormStateMap;
    httpWrapper: HttpWrapperState;
    router: RouterState;
}

export const createRootReducer = (history: History) => combineReducers<StorageState>({
    credentials,
    form: formReducer,
    httpWrapper,
    router: connectRouter(history),
});
