import axios from "axios";
import { env } from "../../../../Utils/env";
import { IReqUserByIdAdmin, IReqUserByUsernameAdmin, ITokenAdmin } from "../../../../Types/Alkareem/REQ/AdminReqType";
import { IGetUserByIdAdmin } from "../../../../Types/Alkareem/RES/AdminGetById";
import { IGetUserByUsernameAdmin } from "../../../../Types/Alkareem/RES/AdminGetByUsername";

const baseUrl = env.REACT_APP_BASE_URL

export async function apiAdminGetUserById({ ...props }: IReqUserByIdAdmin) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const user = await axios
            .get<IGetUserByIdAdmin>
            (`${baseUrl}/admin/user/${props.userId}`, { headers })
        return user
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiAdminGetUserByUsername({ ...props }: IReqUserByUsernameAdmin) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const user = await axios
            .get<IGetUserByUsernameAdmin>
            (`${baseUrl}/admin/user/username/${props.username}`, { headers })
        return user
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiAdminGetProfileById({ ...props }: ITokenAdmin) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const user = await axios
            .get(`${baseUrl}/admin/user/profile/${props.userId}`, { headers })
        return user
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiAdminGetAddressById({ ...props }: ITokenAdmin) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const user = await axios
            .get(`${baseUrl}/admin/user/profile/address/${props.userId}`, { headers })
        return user
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiAdminGetContactById({ ...props }: ITokenAdmin) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const user = await axios
            .get(`${baseUrl}/admin/user/profile/contact/${props.userId}`, { headers })
        return user
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiAdminGetBaniById({ ...props }: ITokenAdmin) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const user = await axios
            .get(`${baseUrl}/admin/user/profile/bani/${props.userId}`, { headers })
        return user
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}