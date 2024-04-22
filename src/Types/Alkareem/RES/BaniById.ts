export interface IBani {
  data: Datum[];
}

interface Datum {
  profileId?: string;
  baniId?: number;
  profile?: Profile;
  bani?: Bani;
}

interface Bani {
  id?: number;
  bani_name?: string;
}

interface Profile {
  name?: string;
}