import axios from "axios";
import { env } from "../../../../Utils/env";
import { IAddressAdmin, IAliveStatusAdmin, IAnakKeAdmin, IBioAdmin, IBirthdayAdmin, IContactAdmin, IGenerasiAdmin, IHusbandAdmin, IIstriKeAdmin, IParentAdmin, IPasswordAdmin, IProfileInfoAdmin, IStatusAdmin, ITokenAdmin, IUsernameAdmin } from "../../../../Types/Alkareem/REQ/AdminReqType";

const baseUrl = env.REACT_APP_BASE_URL

//* USERNAME
export async function apiChangeUsernameAdmin({ ...props }: IUsernameAdmin) {
    try {
        const data = {
            username: props.username
        }
        const headers = {
            Authorization: props.token,
        };
        const changeUsername = await axios.patch(`${baseUrl}/admin/user/${props.userId}`, data, { headers })
        return changeUsername
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* PASSWORD
export async function apiChangePasswordAdmin({ ...props }: IPasswordAdmin) {
    try {
        const data = {
            password: props.password
        }
        const headers = {
            Authorization: props.token,
        };
        const changePassword = await axios.patch(`${baseUrl}/admin/user/${props.userId}`, data, { headers })
        return changePassword
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* BIO
export async function apiChangeBioAdmin({ ...props }: IBioAdmin) {
    try {
        const data = {
            bio: props.bio
        }
        const headers = {
            Authorization: props.token,
        };
        const changeBio = await axios.patch(`${baseUrl}/admin/user/profile/${props.userId}`, data, { headers })
        return changeBio
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* BIRTHDAY
export async function apiChangeBrithdayAdmin({ ...props }: IBirthdayAdmin) {
    try {
        const data = {
            birthday: props.birthday
        }
        const headers = {
            Authorization: props.token,
        };
        const changeBrithday = await axios.patch(`${baseUrl}/admin/user/profile/${props.userId}`, data, { headers })
        return changeBrithday
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* ADDRESS
export async function apiChangeAddressAdmin({ ...props }: IAddressAdmin) {
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
        const changeAddress = await axios.patch(`${baseUrl}/admin/user/profile/address/${props.userId}`, data, { headers })
        return changeAddress
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* PHONE ONLY
export async function apiChangePhoneAdmin({ ...props }: IContactAdmin) {
    try {
        const data = {
            phone: props.phone
        }
        const headers = {
            Authorization: props.token,
        };
        const changePhone = await axios.patch(`${baseUrl}/admin/user/profile/contact/${props.userId}`, data, { headers })
        return changePhone
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* CONTACT
export async function apiChangeContactAdmin({ ...props }: IContactAdmin) {
    try {
        const data = {
            phone: props.phone,
            instagram: props.instagram
        }
        const headers = {
            Authorization: props.token,
        };
        const changePhone = await axios.patch(`${baseUrl}/admin/user/profile/contact/${props.userId}`, data, { headers })
        return changePhone
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* REMOVE AVATAR
export async function apiRemoveAvatarAdmin({ ...props }: ITokenAdmin) {
    try {
        const headers = {
            Authorization: props.token
        };
        const remove = await axios.patch(`${baseUrl}/admin/user/profile/avatar/remove/${props.userId}`, {}, { headers });
        return remove;
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage;
    }
}

//* CHANGE AVATAR
export async function apiUploadAvatarAdmin(userId: string, token: string, avatar: File) {
    try {
        const formData = new FormData();
        formData.append('avatar', avatar);
        const headers = {
            Authorization: token,
            'Content-Type': 'multipart/form-data'
        };

        const uploadAvatar = await axios.patch(`${baseUrl}/admin/user/profile/avatar/${userId}`, formData, { headers });
        return uploadAvatar;
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage;
    }
}

//* NAME AND GENDER
export async function apiChangeProfileInfoAdmin({ ...props }: IProfileInfoAdmin) {
    try {
        const data = {
            name: props.name,
            gender: props.gender
        }
        const headers = {
            Authorization: props.token,
        };
        const profileInfo = await axios.patch(`${baseUrl}/admin/user/profile/${props.userId}`, data, { headers })
        return profileInfo
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* ANAK KE
export async function apiChangeAnakKeAdmin({ ...props }: IAnakKeAdmin) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const data = {
            anak_ke: props.anak_ke,
        }
        const fetch = await axios.patch(`${baseUrl}/admin/user/profile/${props.userId}`, data, { headers })
        return fetch
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* ISTRI KE
export async function apiChangeIstriKeAdmin({ ...props }: IIstriKeAdmin) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const data = {
            istri_ke: props.istri_ke,
        }
        const fetch = await axios.patch(`${baseUrl}/admin/user/profile/${props.userId}`, data, { headers })
        return fetch
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* STATUS KEHIDUPAN
export async function apiChangeAliveStatusAdmin({ ...props }: IAliveStatusAdmin) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const data = {
            alive_status: props.alive_status,
        }
        const fetch = await axios.patch(`${baseUrl}/admin/user/profile/${props.userId}`, data, { headers })
        return fetch
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* GENERASI
export async function apiChangeGenerasiAdmin({ ...props }: IGenerasiAdmin) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const data = {
            generasiId: props.generasiId,
        }
        const fetch = await axios.patch(`${baseUrl}/admin/user/profile/${props.userId}`, data, { headers })
        return fetch
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* STATUS
export async function apiChangeStatusAdmin({ ...props }: IStatusAdmin) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const data = {
            status: props.status,
        }
        const fetch = await axios.patch(`${baseUrl}/admin/user/profile/${props.userId}`, data, { headers })
        return fetch
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* PARENT
export async function apiChangeParentAdmin({ ...props }: IParentAdmin) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const data = {
            parentId: props.parentId,
        }
        const fetch = await axios.patch(`${baseUrl}/admin/user/profile/${props.userId}`, data, { headers })
        return fetch
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}

//* HUSBAND
export async function apiChangeHusbandAdmin({ ...props }: IHusbandAdmin) {
    try {
        const headers = {
            Authorization: props.token,
        };
        const data = {
            husbandId: props.husbandId,
        }
        const fetch = await axios.patch(`${baseUrl}/admin/user/profile/${props.userId}`, data, { headers })
        return fetch
    } catch (error: any) {
        const errorMessage = error.response.data.errors;
        return errorMessage
    }
}