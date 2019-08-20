import { routerMiddleware } from 'connected-react-router';
const createHistory = require('history').createMemoryHistory;
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { createRootReducer, StorageState } from '../reducers';

const logger = createLogger();
export const history = createHistory();
const router = routerMiddleware(history);

const middleware = [
    thunk,
    router,
];

if (__DEV__) {
    middleware.push(logger);
}

const enhancer = compose(
    applyMiddleware(...middleware),
);

export const configureStore = () => createStore<StorageState, any, any, any>(
    createRootReducer(history),
    enhancer,
);
