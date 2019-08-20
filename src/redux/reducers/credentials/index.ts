import { ActionType, BaseAction } from '../../actions';
import { initialState } from './initialState';
import { ShortClientViewModel } from '../../../app/shared/model/client/shortClientViewModel';


export interface CredentialsState {
    client?: ShortClientViewModel;
    token?: string;
}

export const credentials = (state: CredentialsState = initialState, action: BaseAction): CredentialsState => {
    switch (action.type) {
        case ActionType.LOGIN:
            return action.payload;
        case ActionType.LOGOUT:
            return initialState;
        default:
            return state;
    }
};
