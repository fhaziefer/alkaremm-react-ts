export interface ISearchUser {
  data: Datum[];
  paging?: Paging;
}

interface Paging {
  page?: number;
  total_item?: number;
  total_page?: number;
}

interface Datum {
  id?: string;
  username?: string;
  profil?: Profil;
}

interface Profil {
  id?: string;
  name?: string;
  alive_status?: boolean;
  avatar?: string;
  bani?: Bani;
  profileBani? : ProfileBani[]
}

interface Bani {
  bani_name?: string;
}

interface ProfileBani {
  bani?: Bani;
}

interface Bani {
  id?: number;
  bani_name?: string;
}