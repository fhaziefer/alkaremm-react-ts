import axios from "axios"
import { IReqFull, IReqAddress, IReqPostal, ISearchFullAddress, IGetAddress } from "../../../Types/Address/GetAddress";

const baseUrl = 'https://alamat.thecloudalert.com/api/'

export async function apiFullAddress({ ...props }: IReqFull) {
    try {
        const searchUser = await axios
            .get<ISearchFullAddress>
            (`${baseUrl}cari/index/?keyword=${props.query}`)
        return searchUser
    } catch (error: any) {
        const errorMessage = error.response.data.message;
        return errorMessage
    }
}

export async function apiProvince() {
    try {
        const searchUser = await axios
            .get<IGetAddress>
            (`${baseUrl}provinsi/get/`)
        return searchUser
    } catch (error: any) {
        const errorMessage = error.response.data.message;
        return errorMessage
    }
}

export async function apiCity({ ...props }: IReqAddress) {
    try {
        const searchUser = await axios
            .get<IGetAddress>
            (`${baseUrl}kabkota/get/?d_provinsi_id=${props.id}`)
        return searchUser
    } catch (error: any) {
        const errorMessage = error.response.data.message;
        return errorMessage
    }
}

export async function apiDistrict({ ...props }: IReqAddress) {
    try {
        const searchUser = await axios
            .get<IGetAddress>
            (`${baseUrl}kecamatan/get/?d_kabkota_id=${props.id}`)
        return searchUser
    } catch (error: any) {
        const errorMessage = error.response.data.message;
        return errorMessage
    }
}

export async function apiVillage({ ...props }: IReqAddress) {
    try {
        const searchUser = await axios
            .get<IGetAddress>
            (`${baseUrl}kelurahan/get/?d_kecamatan_id=${props.id}`)
        return searchUser
    } catch (error: any) {
        const errorMessage = error.response.data.message;
        return errorMessage
    }
}

export async function apiPostal({ ...props }: IReqPostal) {
    try {
        const searchUser = await axios
            .get<IGetAddress>
            (`${baseUrl}kodepos/get/?d_kabkota_id=${props.cityId}&d_kecamatan_id=${props.districtId}`)
        return searchUser
    } catch (error: any) {
        const errorMessage = error.response.data.message;
        return errorMessage
    }
}