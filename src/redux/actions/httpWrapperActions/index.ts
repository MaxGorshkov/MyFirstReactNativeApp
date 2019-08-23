import { BaseAction, ActionType } from '../index';

export type MessageType = 'error' | 'info';

export interface NotificationMessage {
    message: string;
    messageType: MessageType;
    title?: string;
}

export const increaseBlockingCallCounter = (): BaseAction => ({
    type: ActionType.CALLWRAPPER_BLOCKING_CALL_INCREMENT
});

export const decreaseBlockingCallCounter = (): BaseAction => ({
    type: ActionType.CALLWRAPPER_BLOCKING_CALL_DECREMENT
});

export const newNotificationMessage = (props: NotificationMessage): BaseAction => ({
    type: ActionType.CALLWRAPPER_NOTIFICATIONS_NEW,
    payload: props
});

export const clearNotificationMessages = (): BaseAction => ({
    type: ActionType.CALLWRAPPER_NOTIFICATIONS_CLEAR
});
