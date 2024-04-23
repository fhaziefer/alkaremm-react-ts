import axios from "axios";
import { env } from "../../../Utils/env";
import { IBani, IToken } from "../../../Types/Alkareem/REQ/ReqType";

const baseUrl = env.REACT_APP_BASE_URL

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

export async function apiDeleteBani({...props}:IBani) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const removeBani = await axios.delete(`${baseUrl}/user/profile/bani/current/${props.baniId}`, { headers })
        return removeBani
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}