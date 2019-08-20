import { combineReducers } from 'redux';
import { reducer as formReducer, FormStateMap } from 'redux-form';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';

import { credentials, CredentialsState } from './credentials';

export interface StorageState {
    credentials: CredentialsState;
    form: FormStateMap;
    router: RouterState;
}

export const createRootReducer = (history: History) => combineReducers<StorageState>({
    credentials,
    form: formReducer,
    router: connectRouter(history),
});
