import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RouterAction } from 'connected-react-router';

import { StorageState } from '../reducers';

export enum ActionType {
    RESET = '@@rn/RESET',

    LOGIN = '@@rn/LOGIN',
    LOGOUT = '@@rn/LOGOUT',
}

export class BaseAction<T = any> {
    type: ActionType | undefined;
    payload?: T;
}

export const Reset = (): BaseAction => ({
    type: ActionType.RESET
});

export type BaseThunkAction<A extends AnyAction = BaseAction | RouterAction>
    = ThunkAction<Promise<void> | void, StorageState, {}, A>;
