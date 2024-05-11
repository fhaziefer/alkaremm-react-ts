export interface DetailUserCardProps {
  id?: string
  name?: string
  username?: string
  bio?: string
  bani?: string
  wali?: string
  waliId?: string
  gender?: string
  avatar?: string
  user_alive?: boolean
  parent_alive?: boolean
  husband_alive?: boolean
  husband?: string
  husbandId?: string
  wife?: Data[]
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
  profileBani?: ProfileBani[];
}

interface ProfileBani {
  bani?: Bani;
}

interface Data {
  userId?: string
  istri_ke?: number | string
  anak_ke?: number | string
  name?: string
  gender?:string
  status?: string
  alive_status?: boolean
  husband?: Data
  wives?: Data[]
}

interface Bani {
  id?: number;
  bani_name?: string;
}