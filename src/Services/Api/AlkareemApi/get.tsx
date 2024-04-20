import axios from "axios"
import { env } from "../../../Utils/env"
import { IReqDetailUser, IReqSearchUsers, IToken } from "../../../Types/Alkareem/ReqType"
import { ISearchUsers } from "../../../Types/Alkareem/GetAllUserRes"
import { IDetailUser } from "../../../Types/Alkareem/GetDetailUser"
import { IChildren } from "../../../Types/Alkareem/GetChildren"
import { ICountUser } from "../../../Types/Alkareem/GetTotalUserCount"

const baseUrl = env.REACT_APP_BASE_URL

export async function apiGetUserCurrent({ ...props }: IToken) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const user = await axios.get<IDetailUser>(`${baseUrl}/user/current`, { headers })
        return user
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

export async function apiCountUser({ ...props }: IReqDetailUser) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const totalUser = await axios
            .get<ICountUser>
            (`${baseUrl}/users/total`,
                { headers })
        return totalUser
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiGetAddressCurrent({ ...props }: IToken) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const address = await axios.get(`${baseUrl}/user/profile/address/current`, { headers })
        return address
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}