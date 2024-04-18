import axios from "axios";
import { env } from "../../../Utils/env";
import { ILogin, IRegister } from "../../../Types/Alkareem/ReqType";

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