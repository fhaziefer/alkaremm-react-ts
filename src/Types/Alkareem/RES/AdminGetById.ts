export interface IGetUserByIdAdmin {
  data?: Data;
}

interface Data {
  id?: string;
  username?: string;
  password?: string;
  token?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  profil?: Profil;
}

interface Profil {
  id?: string;
  name?: string;
  gender?: string;
  anak_ke?: number;
  istri_ke?: number;
  birthday?: string;
  pendidikan?: string;
  alive_status?: boolean;
  avatar?: string;
  bio?: string;
  userId?: string;
  baniId?: number;
  generasiId?: number;
  husbandId?: string;
  parentId?: string;
  subscriptionId?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  bani?: Bani;
  generasi?: Generasi;
  subcription?: Subcription;
  parent?: Parent;
  husband?: Profil;
  wives?: Wife[];
  children?: Child[];
  address?: Address;
  contact?: Contact;
  profileBani?: ProfileBani[];
}

interface ProfileBani {
  bani: Bani;
}
interface Contact {
  id?: string;
  phone?: string;
  instagram?: string;
  email?: string;
  profileId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Address {
  id?: string;
  street?: string;
  village?: string;
  district?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  profileId?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Child {
  id?: string;
  name?: string;
  gender?: string;
  anak_ke?: number;
  istri_ke?: number;
  birthday?: string;
  pendidikan?: string;
  alive_status?: boolean;
  avatar?: string;
  bio?: string;
  userId?: string;
  baniId?: number;
  generasiId?: number;
  husbandId?: string;
  parentId?: string;
  subscriptionId?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Wife {
  id?: string;
  name?: string;
  gender?: string;
  anak_ke?: number;
  istri_ke?: number;
  birthday?: string;
  pendidikan?: string;
  alive_status?: boolean;
  avatar?: string;
  bio?: string;
  userId?: string;
  baniId?: number;
  generasiId?: number;
  husbandId?: string;
  parentId?: string;
  subscriptionId?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Parent {
  id?: string;
  name?: string;
  gender?: string;
  anak_ke?: number;
  istri_ke?: number;
  birthday?: string;
  pendidikan?: string;
  alive_status?: boolean;
  avatar?: string;
  bio?: string;
  userId?: string;
  baniId?: number;
  generasiId?: number;
  husbandId?: string;
  parentId?: string;
  subscriptionId?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Subcription {
  id?: string;
  subscription_name?: string;
  subcription_price?: number;
}

interface Generasi {
  id?: number;
  generasi_number?: string;
  generasi_name?: string;
}

interface Bani {
  id?: number;
  bani_name?: string;
}