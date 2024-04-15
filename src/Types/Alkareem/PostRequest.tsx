export interface ILogin {
    username?: string;
    password?: string;
}

export interface IRegister {
    username: string;
    password: string;
    role?: string;
}

export interface IToken {
    token: string;
}

export interface IPassword {
    token?: string;
    password?: string;
}

export interface IReqSearchUsers {
    token?: string;
    query?: string;
    bani?: string;
    page?: number;
    size?: number;
}

export interface IReqDetailUser {
    id?: string;
    token?: string;
}