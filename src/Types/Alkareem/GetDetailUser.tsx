export interface IDetailUser {
  data: Data;
}

export interface Data {
  id: string;
  username: string;
  profil?: Profil;
}

export interface Profil {
  name?: string;
  avatar?: string;
  gender?: string;
  husband?: any;
  wife?: Wife;
  parent?: Wife;
  children?: Child[];
  generasi?: Generasi;
  bani?: Bani;
  contact?: Contact;
  address?: Address;
}

export interface Address {
  street?: string;
  village?: string;
  district?: string;
  city?: string;
  province?: string;
  postal_code?: string
}

export interface Contact {
  phone?: string;
  instagram?: string;
  email?: string;
}

export interface Bani {
  bani_name: string;
}

export interface Generasi {
  generasi_name: string;
}

export interface Child {
  anak_ke: number;
  name: string;
}

export interface Wife {
  name: string;
}