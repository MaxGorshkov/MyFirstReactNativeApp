import { AsyncStorage } from 'react-native';
import jwt_decode from 'jwt-decode';

import { CredentialsState } from './';
import { ShortClientViewModel } from '../../../app/shared/model/client/shortClientViewModel';
import { Asyncstorage } from '../../../app/shared/constants';

export const initialState: CredentialsState = {
};

export const initialize = async (): Promise<CredentialsState> => {
    try {
        const token = await AsyncStorage.getItem(Asyncstorage.token);
        if (token) {
            const decoded = jwt_decode<{ client:  ShortClientViewModel }>(token);
            const credentials = decoded.client;
            return {
                token: token,
                client: credentials
            };
        }
    } catch {}
    return {};
};
