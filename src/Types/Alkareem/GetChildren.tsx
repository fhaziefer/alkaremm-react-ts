export interface IChildren {
  data: Data;
}

export interface Data {
  name: string;
  alive_status: boolean;
  husband?: any;
  wife: Wife;
  children: Child[];
}

export interface Child {
  anak_ke: number;
  name: string;
  alive_status: boolean;
}

export interface Wife {
  id: string;
  name: string;
  alive_status: boolean;
}