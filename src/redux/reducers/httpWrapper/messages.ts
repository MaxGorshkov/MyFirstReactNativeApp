import { ActionType, BaseAction } from '../../actions';
import { NotificationMessage } from '../../actions/httpWrapperActions';

export type MessagesState = NotificationMessage[];
const initialState: MessagesState = [];

export const messages = (state: MessagesState = initialState, action: BaseAction): MessagesState => {
    switch (action.type) {
        case ActionType.RESET:
            return initialState;
        case ActionType.CALLWRAPPER_NOTIFICATIONS_NEW:
            return [
                ...state,
                action.payload
            ];
        case ActionType.CALLWRAPPER_NOTIFICATIONS_CLEAR:
            return [];
        default:
            return state;
    }
};
