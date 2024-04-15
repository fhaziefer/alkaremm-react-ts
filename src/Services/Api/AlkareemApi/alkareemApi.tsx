import axios from "axios"
import { env } from "../../../Utils/env"
import { ILogin, IPassword, IRegister, IReqDetailUser, IReqSearchUsers, IToken } from "../../../Types/Alkareem/PostRequest"
import { ISearchUsers } from "../../../Types/Alkareem/GetAllUserRes"
import {IDetailUser} from "../../../Types/Alkareem/GetDetailUser"
import { IChildren } from "../../../Types/Alkareem/GetChildren"

const baseUrl = env.REACT_APP_BASE_URL

export async function apiLogin({ ...props }: ILogin) {
    try {
        const login = await axios.post(`${baseUrl}/login`, { ...props })
        return login
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiRegister({ ...props }: IRegister) {
    try {
        const register = await axios.post(`${baseUrl}/register`, { ...props })
        return register
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiLogout({ ...props }: IToken) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const logout = await axios.delete(`${baseUrl}/logout`, { headers })
        return logout
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiGetUserCurrent({ ...props }: IToken) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const user = await axios.get(`${baseUrl}/user/current`, { headers })
        return user.data.data
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiChangePassword({ ...props }: IPassword) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const changePassword = await axios.patch(`${baseUrl}/user/current`, { headers })
        return changePassword
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiSearchUser({ ...props }: IReqSearchUsers) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const searchUser = await axios
            .get<ISearchUsers>
            (`${baseUrl}/user/search/bani?keyword=%${props.query}&bani=%${props.bani}&page=${props.page}&size=75`,
                { headers })
        return searchUser
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiDetailUser({ ...props }: IReqDetailUser) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const user = await axios
            .get<IDetailUser>
            (`${baseUrl}/user/${props.id}`,
                { headers })
        return user
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiChildren({ ...props }: IReqDetailUser) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const children = await axios
            .get<IChildren>
            (`${baseUrl}/user/children/${props.id}`,
                { headers })
        return children
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}