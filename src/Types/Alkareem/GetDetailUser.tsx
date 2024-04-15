export interface IDetailUser {
  data: Data;
}

export interface Data {
  id: string;
  username: string;
  profil?: Profil;
}

export interface Profil {
  id?: string;
  name?: string;
  bio?: string;
  avatar?: string;
  gender?: string;
  husband?: Person;
  wife?: Person;
  alive_status?: boolean;
  parent?: Person;
  status?: string;
  children?: Child[];
  generasi?: Generasi;
  bani?: Bani;
  contact?: Contact;
  address?: Address;
  birthday?: string;
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
  alive_status?: boolean;
}

export interface Person {
  id?: string;
  name?: string;
  alive_status?: boolean;
}