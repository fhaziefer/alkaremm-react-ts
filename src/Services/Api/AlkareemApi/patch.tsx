import axios from "axios";
import { env } from "../../../Utils/env";
import { IPassword } from "../../../Types/Alkareem/ReqType";


const baseUrl = env.REACT_APP_BASE_URL

//* PATCH
export async function apiChangePassword({ ...props }: IPassword) {
    try {
        const data = {
            password: props.password
        }
        const headers = {
            Authorization: props.token,
        };
        const changePassword = await axios.patch(`${baseUrl}/user/current`, data, { headers })
        return changePassword
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}