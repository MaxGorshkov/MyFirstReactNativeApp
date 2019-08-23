import { ActionType, BaseAction } from '../../actions';

export type BlockingCallCountState = number;
const initialState: BlockingCallCountState = 0;

export const blockingCallCount = (state: BlockingCallCountState = initialState, action: BaseAction): BlockingCallCountState => {
    switch (action.type) {
        case ActionType.RESET:
            return initialState;
        case ActionType.CALLWRAPPER_BLOCKING_CALL_INCREMENT:
            return state + 1;
        case ActionType.CALLWRAPPER_BLOCKING_CALL_DECREMENT:
            return state - 1;
        default:
            return state;
    }
};
