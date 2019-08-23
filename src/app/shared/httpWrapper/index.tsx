import { connect } from 'react-redux';

import { View, IModel } from './view';
import { HttpService } from './service';
import { HttpWrapperOptions } from './options';
import { clearNotificationMessages } from '../../../redux/actions/httpWrapperActions';
import { StorageState } from '../../../redux/reducers';
import { uniqueStrings } from '../pipes';

const HttpWrapper = connect<IModel, any, {}, StorageState>(
    (state) => {
        return {
            blockingCallCount: state.httpWrapper.blockingCallCount,
            messages: (state.httpWrapper.messages && state.httpWrapper.messages.length > 0)
                ? uniqueStrings(state.httpWrapper.messages.map(msg => msg.message))
                : [],
            title: state.httpWrapper.messages && state.httpWrapper.messages.length > 0
                ? state.httpWrapper.messages[0].title : '',
            clearNotificationMessages: () => {},
        };
    },
    (dispatch: any) => ({
        clearNotificationMessages: () => dispatch(clearNotificationMessages())
    })
)(View);

const httpService = new HttpService();

export { HttpWrapper, httpService, HttpWrapperOptions };
