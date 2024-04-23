import axios from "axios"
import { env } from "../../../Utils/env"
import { IReqDetailUser, IReqSearchProfile, IReqSearchUsers, IToken } from "../../../Types/Alkareem/REQ/ReqType"
import { ICurrentUser } from "../../../Types/Alkareem/RES/CurrentUser"
import { ISearchUser } from "../../../Types/Alkareem/RES/SearchUser"
import { ICountTotalUsers } from "../../../Types/Alkareem/RES/CountUser"
import { IChildren } from "../../../Types/Alkareem/RES/ChildrenById"
import { IUserById } from "../../../Types/Alkareem/RES/UserById"
import { ISearchProfile } from "../../../Types/Alkareem/RES/SearchProfile"

const baseUrl = env.REACT_APP_BASE_URL

export async function apiGetUserCurrent({ ...props }: IToken) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const user = await axios
            .get<ICurrentUser>
            (`${baseUrl}/user/current`, { headers })
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
            .get<ISearchUser>
            (`${baseUrl}/user/search/bani?keyword=${props.query}&bani=${props.bani}&page=${props.page}&size=100`,
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
            .get<IUserById>
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
            .get<ICountTotalUsers>
            (`${baseUrl}/users/total`,
                { headers })
        return totalUser
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiGetContactCurrent({ ...props }: IToken) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const contact = await axios.get(`${baseUrl}/user/profile/contact/current`, { headers })
        return contact
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

export async function apiGetProfile({ ...props }: IToken) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const profile = await axios.get(`${baseUrl}/user/profile/current`, { headers })
        return profile
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiGetBani({ ...props }: IToken) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const bani = await axios.get(`${baseUrl}/user/profile/bani/current`, { headers })
        return bani
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiSearchProfile({ ...props }: IReqSearchProfile) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const profile = await axios.get<ISearchProfile>(`${baseUrl}/user/profile/search?keyword=${props.query}`, { headers })
        return profile
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}