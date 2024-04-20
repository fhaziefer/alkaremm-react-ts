import axios from "axios";
import { env } from "../../../Utils/env";
import { IAddress, IBio, IBirthday, IContact, IPassword, IUsername } from "../../../Types/Alkareem/ReqType";
const baseUrl = env.REACT_APP_BASE_URL

//* USERNAME
export async function apiChangeUsername({ ...props }: IUsername) {
    try {
        const data = {
            username: props.username
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

//* BIO
export async function apiChangeBio({ ...props }: IBio) {
    try {
        const data = {
            bio: props.bio
        }
        const headers = {
            Authorization: props.token,
        };
        const changeBio = await axios.patch(`${baseUrl}/user/profile/current`, data, { headers })
        return changeBio
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* BIRTHDAY
export async function apiChangeBrithday({ ...props }: IBirthday) {
    try {
        const data = {
            birthday: props.birthday
        }
        const headers = {
            Authorization: props.token,
        };
        const changeBrithday = await axios.patch(`${baseUrl}/user/profile/current`, data, { headers })
        return changeBrithday
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* ADDRESS
export async function apiChangeAddress({ ...props }: IAddress) {
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
        const changeAddress = await axios.patch(`${baseUrl}/user/profile/address/current`, data, { headers })
        return changeAddress
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* CONTACT
export async function apiChangeContact({ ...props }: IContact) {
    try {
        const data = {
            phone: props.phone,
            instagram: props.instagram
        }
        const headers = {
            Authorization: props.token,
        };
        const changeContact = await axios.patch(`${baseUrl}/user/profile/contact/current`, data, { headers })
        return changeContact
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}