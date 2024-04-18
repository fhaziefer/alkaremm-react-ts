import axios from "axios";
import { env } from "../../../Utils/env";
import { IPassword, IUsername } from "../../../Types/Alkareem/ReqType";
const baseUrl = env.REACT_APP_BASE_URL

//* USERNAME
export async function apiChangeUsername({ ...props }: IUsername) {
    try {
        const data = {
            usernmae: props.username
        }
        const headers = {
            Authorization: props.token,
        };
        const changeUsername = await axios.patch(`${baseUrl}/user/current`, data, { headers })
        return changeUsername
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* PASSWORD
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