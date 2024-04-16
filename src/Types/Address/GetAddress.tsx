export interface IReqFull {
    query : string;
}

export interface IReqAddress {
    query : string;
}

export interface IReqPostal {
    districtId : string;
    cityId : string;
}

export interface ISearchFullAddress {
  status: number;
  message: string;
  result: FullAddress[];
}

export interface FullAddress {
  negara: string;
  provinsi: string;
  kabkota: string;
  kecamatan: string;
  desakel: string;
}

export interface IGetAddress {
  status: number;
  message: string;
  result: Result[];
}

export interface Result {
  id: string;
  text: string;
}
