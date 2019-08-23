import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RouterAction } from 'connected-react-router';

import { StorageState } from '../reducers';

export enum ActionType {
    RESET = '@@rn/RESET',

    LOGIN = '@@rn/LOGIN',
    LOGOUT = '@@rn/LOGOUT',

    CALLWRAPPER_BLOCKING_CALL_INCREMENT = '@@callwrapper/BLOCKING_CALL_INCREMENT',
    CALLWRAPPER_BLOCKING_CALL_DECREMENT = '@@callwrapper/BLOCKING_CALL_DECREMENT',
    CALLWRAPPER_NOTIFICATIONS_NEW = '@@callwrapper/NOTIFICATIONS_NEW',
    CALLWRAPPER_NOTIFICATIONS_CLEAR = '@@callwrapper/NOTIFICATIONS_CLEAR',
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
