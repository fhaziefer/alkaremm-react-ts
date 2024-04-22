export interface IChildren {
  data: Data;
}

interface Data {
  profil?: Profil;
}

interface Profil {
  name?: string;
  children?: Child[];
}

interface Child {
  userId?: string;
  anak_ke?: number;
  name?: string;
  gender?: string;
  alive_status?: boolean;
}