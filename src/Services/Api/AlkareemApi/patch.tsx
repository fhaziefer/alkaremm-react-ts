import axios from "axios";
import { env } from "../../../Utils/env";
import { IAddress, IAliveStatus, IAnakKe, IAvatar, IBio, IBirthday, IContact, IGenerasi, IHusband, IIstriKe, IParent, IPassword, IProfileInfo, IStatus, IToken, IUsername } from "../../../Types/Alkareem/REQ/ReqType";
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

//* PHONE ONLY
export async function apiChangePhone({ ...props }: IContact) {
    try {
        const data = {
            phone: props.phone
        }
        const headers = {
            Authorization: props.token,
        };
        const changePhone = await axios.patch(`${baseUrl}/user/profile/contact/current`, data, { headers })
        return changePhone
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
        const changePhone = await axios.patch(`${baseUrl}/user/profile/contact/current`, data, { headers })
        return changePhone
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* REMOVE AVATAR
export async function apiRemoveAvatar({ ...props }: IToken) {
    try {
        const headers = {
            Authorization: props.token
        };
        const remove = await axios.patch(`${baseUrl}/user/profile/avatar/current/remove`, {}, { headers });
        return remove;
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage;
    }
}

//* CHANGE AVATAR
export async function apiUploadAvatar(token: string, avatar: File) {
    try {
        const formData = new FormData();
        formData.append('avatar', avatar);
        const headers = {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
        };

        const uploadAvatar = await axios.patch(`${baseUrl}/user/profile/avatar/current`, formData, { headers });
        return uploadAvatar;
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage;
    }
}

//* NAME AND GENDER
export async function apiChangeProfileInfo({ ...props }: IProfileInfo) {
    try {
        const data = {
            name: props.name,
            gender: props.gender
        }
        const headers = {
            Authorization: props.token,
        };
        const profileInfo = await axios.patch(`${baseUrl}/user/profile/current`, data, { headers })
        return profileInfo
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* ANAK KE
export async function apiChangeAnakKe({ ...props }: IAnakKe) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const data = {
            anak_ke: props.anak_ke,
        }
        const fetch = await axios.patch(`${baseUrl}/user/profile/current`, data, { headers })
        return fetch
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* ISTRI KE
export async function apiChangeIstriKe({ ...props }: IIstriKe) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const data = {
            istri_ke: props.istri_ke,
        }
        const fetch = await axios.patch(`${baseUrl}/user/profile/current`, data, { headers })
        return fetch
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* STATUS KEHIDUPAN
export async function apiChangeAliveStatus({ ...props }: IAliveStatus) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const data = {
            alive_status: props.alive_status,
        }
        const fetch = await axios.patch(`${baseUrl}/user/profile/current`, data, { headers })
        return fetch
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* GENERASI
export async function apiChangeGenerasi({ ...props }: IGenerasi) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const data = {
            generasiId: props.generasiId,
        }
        const fetch = await axios.patch(`${baseUrl}/user/profile/current`, data, { headers })
        return fetch
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* STATUS
export async function apiChangeStatus({ ...props }: IStatus) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const data = {
            status: props.status,
        }
        const fetch = await axios.patch(`${baseUrl}/user/profile/current`, data, { headers })
        return fetch
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* PARENT
export async function apiChangeParent({ ...props }: IParent) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const data = {
            parentId: props.parentId,
        }
        const fetch = await axios.patch(`${baseUrl}/user/profile/current`, data, { headers })
        return fetch
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* HUSBAND
export async function apiChangeHusband({ ...props }: IHusband) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const data = {
            husbandId: props.husbandId,
        }
        const fetch = await axios.patch(`${baseUrl}/user/profile/current`, data, { headers })
        return fetch
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}