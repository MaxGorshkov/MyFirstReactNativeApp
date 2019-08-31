export interface FormModel {
    email: string;
    password: string;
}

export interface IModel {
    token?: string;
    formModel: FormModel;
    isFormValid: () => boolean;
}

export interface IActions {
    onLoginPressed: () => Promise<void>;
    onLogoutPressed: () => Promise<void>;
}

export interface IStateProps extends IModel, IActions {
}
