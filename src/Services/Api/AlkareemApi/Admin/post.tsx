import axios from "axios";
import { env } from "../../../../Utils/env";
import { IAddressAdmin, IBaniAdmin, IContactAdmin, IProfileInfoAdmin } from "../../../../Types/Alkareem/REQ/AdminReqType";

const baseUrl = env.REACT_APP_BASE_URL
export async function apiCreateProfileAdmin({ ...props }: IProfileInfoAdmin) {
    try {
        const data = {
            name: props.name,
            gender: props.gender
        }
        const headers = {
            Authorization: props.token
        }
        const createProfile = await axios.post(`${baseUrl}/admin/user/profile/${props.userId}`, data, { headers })
        return createProfile
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

export async function apiCreateContactAdmin({ ...props }: IContactAdmin) {
    try {
        const data = {
            instagram: props.instagram,
            phone: props.phone
        }
        const headers = {
            Authorization: props.token,
        };
        const createContact = await axios.post(`${baseUrl}/admin/user/profile/contact/${props.userId}`, data, { headers })
        return createContact;
    } catch (error: any) {
        const errrorMessage = error.response.data.errors;
        return errrorMessage
    }
}

export async function apiCreateAddressAdmin({ ...props }: IAddressAdmin) {
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
        const createAddress = await axios.post(`${baseUrl}/admin/user/profile/address/${props.userId}`, data, { headers })
        return createAddress;
    } catch (error: any) {
        const errrorMessage = error.response.data.errors;
        return errrorMessage
    }
}

export async function apiCreateBaniAdmin({ ...props }: IBaniAdmin) {
    try {
        const data = {
            baniId: props.baniId
        }
        const headers = {
            Authorization: props.token,
        };
        const createBani = await axios.post(`${baseUrl}/admin/user/profile/bani/${props.userId}`, data, {headers})
        return createBani
    } catch (error: any) {
        const errrorMessage = error.response.data.errors;
        return errrorMessage
    }
}