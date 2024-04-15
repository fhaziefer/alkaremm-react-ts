export interface DetailUserCardProps {
    name?: string
    username?: string
    bio?: string
    bani?: string
    wali?: string
    gender?: string
    avatar?: string
    user_alive?: boolean
    parent_alive?: boolean
    husband_alive?: boolean
    wife_alive?: boolean
    husband?: string
    wife?: string
    generasi?: string
    children?: Data[]
    street?: string
    village?: string
    district?: string
    city?: string
    province?: string
    postal?: string;
    phone?: string
    instagram?: string
    email?: string
    birthday?: string;
}

export interface Data {
    anak_ke?: number | string
    name?: string
    alive_status?: boolean
}