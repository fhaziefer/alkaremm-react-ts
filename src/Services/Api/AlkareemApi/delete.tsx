import axios from "axios";
import { env } from "../../../Utils/env";
import { IToken } from "../../../Types/Alkareem/REQ/ReqType";

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