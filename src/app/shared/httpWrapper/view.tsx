import * as React from 'react';

import { Modal } from '../../shared/components/modal';
import { Spinner } from '../components/spinner';

export interface IModel {
    blockingCallCount: number;
    messages: string[];
    title?: string;
    clearNotificationMessages: () => void;
}

export class View extends React.Component<IModel> {
    render() {
        const { blockingCallCount, messages, title, clearNotificationMessages } = this.props;
        return (
            <>
                {
                    blockingCallCount > 0 &&
                    <Spinner />
                }
                {
                    !!messages && messages.length > 0 &&
                    <Modal
                        onHide={clearNotificationMessages}
                        header={title}
                        close='Закрыть'>
                        <>
                        {
                            messages.map((message, index: number) => {
                                return <div key={index}>{message}</div>;
                            })
                        }
                        </>
                    </Modal>
                }
            </>
        );
    }
}
