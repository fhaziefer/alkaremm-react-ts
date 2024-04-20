import axios from "axios";
import { env } from "../../../Utils/env";
import { IAddress, ILogin, IRegister } from "../../../Types/Alkareem/ReqType";

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

export async function apiCreateAddress({ ...props }: IAddress) {
    try {
        const data = {
            street: props.street,
            village: props.village,
            district: props.district,
            city: props.city,
            province: props.province,
            postal_code: props.postal_code
        }
        const headers = {
            Authorization: props.token,
        };
        const createAddress = await axios.post(`${baseUrl}/user/profile/address`, data, {headers})
        return createAddress;
    } catch (error: any) {
        const errrorMessage = error.response.data.errors;
        return errrorMessage
    }
}