export interface TypeUsers {
  data: Datum[];
  paging: Paging;
}

export interface Paging {
  page: number;
  total_item: number;
  total_page: number;
}

export interface Datum {
  id: string;
  username: string;
  profil: Profil;
}

export interface Profil {
  name: string;
  avatar: string;
  husband?: Husband;
  wife?: Husband;
  parent?: Husband;
  generasi: Generasi;
  bani: Bani;
  contact?: Contact;
  address?: Address;
}

export interface Address {
  street: string;
  village: string;
  district: string;
  city: string;
  province: string;
}

export interface Contact {
  phone: string;
  instagram: string;
  email: string;
}

export interface Bani {
  bani_name: string;
}

export interface Generasi {
  generasi_name: string;
}

export interface Husband {
  name: string;
}