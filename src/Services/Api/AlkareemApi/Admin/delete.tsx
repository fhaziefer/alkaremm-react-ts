import axios from "axios";
import { env } from "../../../../Utils/env";
import { IBaniAdmin, ITokenAdmin } from "../../../../Types/Alkareem/REQ/AdminReqType";

const baseUrl = env.REACT_APP_BASE_URL

export async function apiDeleteUserAdmin({ ...props }: ITokenAdmin) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const deleteUser = await axios.delete(`${baseUrl}/admin/user/${props.userId}`, { headers })
        return deleteUser
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiDeleteBaniAdmin({ ...props }: IBaniAdmin) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const removeBani = await axios.delete(`${baseUrl}/admin/user/profile/bani/${props.userId}/${props.baniId}`, { headers })
        return removeBani
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}