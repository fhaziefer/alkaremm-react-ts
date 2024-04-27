export interface IReqUserByIdAdmin {
    token?: string
    userId?: string
}

export interface ITokenAdmin {
    userId?: string
    token?: string;
}

export interface IUsernameAdmin {
    userId?: string
    token?: string;
    username: string;
}

export interface IPasswordAdmin {
    userId?: string
    token?: string;
    password?: string;
}

export interface IBioAdmin {
    userId?: string
    token?: string;
    bio?: string;
}

export interface IAddressAdmin {
    userId?: string
    token?: string;
    street?: string;
    village?: string;
    district?: string;
    city?: string;
    province?: string;
    postal_code?: string;
}

export interface IContactAdmin {
    userId?: string
    token?: string;
    phone?: string;
    instagram?: string;
}

export interface IBirthdayAdmin {
    userId?: string
    token?: string;
    birthday?: string;
}

export interface IAvatarAdmin {
    userId?: string
    token?: string;
    avatar: File;
}

export interface IProfileInfoAdmin {
    userId?: string
    token?: string;
    name?: string;
    gender?: string;
}

export interface IBaniAdmin {
    userId?: string
    token?: string;
    baniId?: string;
}

export interface IAnakKeAdmin {
    userId?: string
    token?: string;
    anak_ke?: string;
}

export interface IGenerasiAdmin {
    userId?: string
    token?: string
    generasiId?: string
}

export interface IStatusAdmin {
    userId?: string
    token?: string
    status?: string
}

export interface IParentAdmin {
    userId?: string
    token?: string;
    parentId?: string;
}

export interface IHusbandAdmin {
    userId?: string
    token?: string;
    husbandId?: string;
}