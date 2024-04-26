import axios from "axios";
import { IUserById } from "../../../../Types/Alkareem/RES/UserById";
import { env } from "../../../../Utils/env";
import { IReqUserByIdAdmin } from "../../../../Types/Alkareem/REQ/AdminReqType";
import { IGetUserByIdAdmin } from "../../../../Types/Alkareem/RES/AdminGetById";

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