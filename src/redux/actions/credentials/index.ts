import jwt_decode from 'jwt-decode';

import { ActionType, BaseThunkAction } from '../index';
import { Asyncstorage, Routes, appUrls } from '../../../app/shared/constants';
import { httpService } from '../../../app/shared/httpWrapper';
import { push } from 'connected-react-router';
import { FormModel } from '../../../app/content/login/model';
import { ShortClientViewModel } from '../../../app/shared/model/client/shortClientViewModel';
import { AsyncStorage } from 'react-native';


export const login = (credentials: FormModel): BaseThunkAction => {
    return async (dispatch, getState) => {
        const {token, client} = await httpService
            .post<{token: string, client: ShortClientViewModel}>(appUrls.api_login, credentials);

        if (!token) {
            return;
        }
        const decoded = jwt_decode<{ client:  ShortClientViewModel }>(token);
        const shortClientViewModel = decoded.client;

        await AsyncStorage.setItem(Asyncstorage.token, token);
        dispatch({
            type: ActionType.LOGIN,
            payload: {
                token: token,
                client: shortClientViewModel
            }
        });
        // dispatch(setActiveClient(client));
    };
};

export const logout = (reload: boolean): BaseThunkAction => {
    return async (dispatch, getState) => {
        await httpService.get<void>(appUrls.api_logout);
        AsyncStorage.removeItem(Asyncstorage.token);

        dispatch({
            type: ActionType.LOGOUT
        });

        dispatch(push(Routes.empty));
    };
};
