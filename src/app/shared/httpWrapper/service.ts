import axios, { AxiosRequestConfig } from 'axios';
import { AsyncStorage } from 'react-native';

import { HttpWrapperOptions } from './options';
import {
    increaseBlockingCallCounter,
    decreaseBlockingCallCounter,
    newNotificationMessage
} from '../../../redux/actions/httpWrapperActions';

import { store } from '../../../app';
import { Asyncstorage, HttpStatusCode, appUrls } from '../constants';
import { StorageState } from '../../../redux/reducers';



type RequestType = 'get' | 'post' | 'put' | 'delete';

const cancelRequestBecauseOfNewOne = 'cancel request because of new one';
// const queryString = require('querystring');
// const initializeTimestamp = new Date().getTime();

export class HttpService {
    private cancelations: { [key: string]: any } = {};

    public showFanCounter: number = 0;

    public async get<T>(url: string, httpWrapperOptions?: HttpWrapperOptions): Promise<T> {
        const queryStringParams = {
            _t: httpWrapperOptions && httpWrapperOptions.cacheQueryParams || +new Date()
        };
        return this.processRequest<T>(url, 'get', null, httpWrapperOptions, queryStringParams);
    }

    public async post<T = void>(url: string, data?: any, httpWrapperOptions?: HttpWrapperOptions): Promise<T> {
        return this.processRequest<T>(url, 'post', data, httpWrapperOptions);
    }

    public async put<T = void>(url: string, data?: any, httpWrapperOptions?: HttpWrapperOptions): Promise<T> {
        return this.processRequest<T>(url, 'put', data, httpWrapperOptions);
    }

    public async delete<T = void>(url: string, data?: any, httpWrapperOptions?: HttpWrapperOptions): Promise<T> {
        return this.processRequest<T>(url, 'delete', data, httpWrapperOptions);
    }

    private async processRequest<T>(url: string,
            method: RequestType,
            data?: any,
            httpWrapperOptions?: HttpWrapperOptions,
            queryParams: any = null): Promise<T> {

        return new Promise<T>(async (resolve, reject) => {
            if (!httpWrapperOptions) {
                httpWrapperOptions = new HttpWrapperOptions();
            }

            if (httpWrapperOptions.wait) {
                setTimeout(() => {
                    store.dispatch(increaseBlockingCallCounter());
                }, httpWrapperOptions.waitTimeout);
            }

            const state = store.getState() as StorageState;
            const headers: any = {};
            if (httpWrapperOptions.requestIdentificator) {
                headers['ppm-identificator'] = httpWrapperOptions.requestIdentificator;
            }

            const token = await AsyncStorage.getItem(Asyncstorage.token);
            if (token) {
                headers['x-access-token'] = token;
            }

            const thisObject = this;

            const axiosRequestConfig: AxiosRequestConfig = Object.assign({}, {
                method: method,
                responseType: httpWrapperOptions.responseType,
                timeout: httpWrapperOptions.timeout,
                headers: headers,
                data: (data) ? data : undefined,
                params: queryParams,
            });

            const normalizedUrl = this.normalizeUrl(url);
            try {
                let res: any = null;
                let callCounter = 0;
                while (1 === 1) {

                    try {
                        if (httpWrapperOptions.requestSequenceIdentificator) {
                            if (this.cancelations[httpWrapperOptions.requestSequenceIdentificator]) {
                                this.cancelations[httpWrapperOptions.requestSequenceIdentificator](cancelRequestBecauseOfNewOne);
                                this.cancelations[httpWrapperOptions.requestSequenceIdentificator] = null;
                            }
                            // axiosRequestConfig.cancelToken = new CancelToken((c) => {
                            //         thisObject.cancelations[httpWrapperOptions.requestSequenceIdentificator] = c;
                            // });
                        }
                        const axiosPromise: Promise<any> = axios(normalizedUrl, axiosRequestConfig);
                        res = await axiosPromise;
                        if (res.status === HttpStatusCode.accepted) {
                            throw {
                                response: res,
                            };
                        }
                        if (httpWrapperOptions.requestSequenceIdentificator) {
                            this.cancelations[httpWrapperOptions.requestSequenceIdentificator] = null;
                        }
                        break;
                    } catch (err) {
                        if (err.message === cancelRequestBecauseOfNewOne) {
                            res = {
                                data: null
                            };
                            console.warn('request canceled by next one');
                            break;
                        }

                        ++callCounter;
                        if (httpWrapperOptions.requestSequenceIdentificator) {
                            if (this.cancelations[httpWrapperOptions.requestSequenceIdentificator]) {
                                console.warn('request canceled by next try');
                                this.cancelations[httpWrapperOptions.requestSequenceIdentificator]();
                                this.cancelations[httpWrapperOptions.requestSequenceIdentificator] = null;
                            }
                        }

                        if (err.code !== 'ECONNABORTED' || callCounter > httpWrapperOptions.extraTries) {
                            throw err;
                        }
                    }
                }
                this.showDialog(httpWrapperOptions, true, undefined);

                // if (res && res.headers && res.headers['web-client-version']
                //     && state.resources.settings
                //     && res.headers['web-client-version'] !== state.resources.settings.webClientVersion
                //     && ((new Date().getTime() - initializeTimestamp) > 300000)) {
                //     setTimeout(() => location.reload(true), 1000);
                // }
                // if (res && res.headers && res.headers['resource-version']) {
                //     store.dispatch(checkVersion(+res.headers['resource-version']));
                // }
                resolve(res.data);
            } catch (reason) {
                if (url !== appUrls.api_add_client_side_error && httpWrapperOptions.errors) {
                    let msg = reason.toString();
                    let status = (reason.response && reason.response.status) ? reason.response.status : 500;

                    const body = (data) ? JSON.parse(JSON.stringify(data)) : null;
                    if (body && body.password) {
                        body.password = '******';
                    }
                    if (body && body.passwordConfirmation) {
                        body.passwordConfirmation = '******';
                    }
                    let connectSymbol = '';
                    if (normalizedUrl.includes('?')) {
                        connectSymbol = '&';
                    } else if (queryParams && Object.getOwnPropertyNames(queryParams).length !== 0) {
                        connectSymbol = '?';
                    }
                    // const query = `${normalizedUrl}${connectSymbol}${queryString.stringify(queryParams)}`;
                    // const error: ClientSideErrorCreator = {
                    //     body,
                    //     query: `${method} ${query}`,
                    //     version: state.resources.settings ? state.resources.settings.webClientVersion : 'version not loaded'
                    // };

                    if (reason.code === 'ECONNABORTED') {
                        status = HttpStatusCode.timeout;
                    }
                    const msgFromServer = (reason.response && reason.response.data && reason.response.data.errorDetails)
                        ? reason.response.data.errorDetails : null;
                    msg = msgFromServer || msg;
                    if (status === HttpStatusCode.unauthorized) {
                        // window.location.href = '/';
                    } else {
                        switch (status) {
                            case HttpStatusCode.badRequest: msg = msg || 'Произошла непредвиденная ситуация'; break;
                            case HttpStatusCode.forbidden:
                                // await store.dispatch(logout(false));
                                msg = msg || 'В доступе отказано';
                                break;
                            case HttpStatusCode.timeout: msg = 'Запрос не был обработан за отведенное время'; break;
                            case HttpStatusCode.exception:
                                msg = 'Упс. Произошла ошибка';
                                if (msgFromServer) {
                                    msg += `. Описание: ${msgFromServer}.`;
                                }
                                break;
                        }

                        // if (status !== HttpStatusCode.accepted) {
                        //     error.error = msg;
                        //     const errorRequestHeaders = JSON.parse(JSON.stringify(headers));
                        //     // errorRequestHeaders['ppm-identificator'] = newGuid();
                        //     const errorRequestConfig: AxiosRequestConfig = Object.assign({}, {
                        //         method: 'post' as Method,
                        //         responseType: 'json' as ResponseType,
                        //         timeout: httpWrapperOptions.timeout,
                        //         headers: errorRequestHeaders,
                        //         data: error,
                        //     });

                        //     axios(this.normalizeUrl(appUrls.api_add_client_side_error), errorRequestConfig);
                        // }

                        this.showDialog(httpWrapperOptions, false, msg);
                    }
                }
                reject(reason.response || reason);
            }
            finally {
                if (httpWrapperOptions.wait) {
                    store.dispatch(decreaseBlockingCallCounter());
                }
            }
        });
    }

    private showDialog(httpWrapperOptions: HttpWrapperOptions, success: boolean, text?: string) {
        if (success) {
            if (httpWrapperOptions.success) {
                store.dispatch(newNotificationMessage(
                    {
                        message: httpWrapperOptions.successText || text || 'Какая то информация',
                        messageType: 'error',
                        title: 'Информация'
                    }
                ));
            }
        } else {
            if (httpWrapperOptions.errors) {
                store.dispatch(newNotificationMessage(
                    {
                        message: httpWrapperOptions.errorText || text || 'Неопознанная ошибка',
                        messageType: 'error',
                        title: 'Ошибка'
                    }
                ));
            }
        }
    }

    private normalizeUrl(url: string): string {
        if (url.indexOf('http') !== 0) {
            // return `${process.env.REACT_APP_BACKEND_URL}${url}`; TODO: system variables?
            return `http://localhost:8500${url}`;
        } else {
            return `${url}`;
        }
    }
}
