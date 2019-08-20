export interface ShortProfileViewModel {
    surname?: string;
    name?: string;
    patronymic?: string;
    phone?: string;
    team?: number [];
}

export enum ClientState {
    block = 0,
    active = 100
}

export enum ClientRole {
    client = 0,
    admin = 1,
    manager = 2,
    teamLead = 3,
}

export interface ShortClientViewModel {
    id?: number;
    email?: string;
    state?: ClientState;
    role?: ClientRole;
    profile?: ShortProfileViewModel;
}
