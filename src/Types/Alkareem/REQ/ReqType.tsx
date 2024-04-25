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
    token?: string;
}

export interface IReqSearchUsers {
    token?: string;
    query?: string;
    bani?: string;
    page?: number;
    size?: number;
}

export interface IReqSearchProfile {
    token?: string;
    query?: string;
}

export interface IReqDetailUser {
    id?: string;
    token?: string;
}

export interface IUsername {
    token?: string;
    username: string;
}

export interface IPassword {
    token?: string;
    password?: string;
}

export interface IBio {
    token?: string;
    bio?: string;
}

export interface IAddress {
    token?: string;
    street?: string;
    village?: string;
    district?: string;
    city?: string;
    province?: string;
    postal_code?: string;
}

export interface IContact {
    token?: string;
    phone?: string;
    instagram?: string;
}

export interface IBirthday {
    token?: string;
    birthday?: string;
}

export interface IAvatar {
    token?: string;
    avatar: File;
}

export interface IProfileInfo {
    token?: string;
    name?: string;
    gender?: string;
}

export interface IBani {
    token?: string;
    baniId?: string;
}

export interface IAnakKe {
    token?: string;
    anak_ke?: string;
}

export interface IGenerasi {
    token?: string
    generasiId?: string
}

export interface IStatus {
    token?: string
    status?: string
}

export interface IParent {
    token?: string;
    parentId?: string;
}

export interface IHusband {
    token?: string;
    husbandId?: string;
}