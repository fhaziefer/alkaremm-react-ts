export interface ProfileCardProps {
    name?: string
    bani?: string
    wali?: string
    gender?: string
    avatar?: string
    alive?: boolean
    husband?: string
    wife?: string
    generasi?: string
    childs?: Child[]
    street?: string
    village?: string
    district?: string
    city?: string
    province?: string
    postal?: string;
    phone?: string
    instagram?:string
    email?: string
}

export interface Child {
    anak_ke?: number | string
    name?: string
}