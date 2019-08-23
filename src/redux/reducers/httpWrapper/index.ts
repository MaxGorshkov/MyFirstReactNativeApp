import { combineReducers } from 'redux';
import { blockingCallCount, BlockingCallCountState } from './blockingCallCount';
import { messages, MessagesState } from './messages';

export class HttpWrapperState {
    public blockingCallCount: BlockingCallCountState;
    public messages: MessagesState;
}

const httpWrapper = combineReducers<HttpWrapperState>({
    blockingCallCount,
    messages
});

export { httpWrapper };
