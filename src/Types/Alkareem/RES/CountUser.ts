export interface ICountTotalUsers {
  message?: string;
  data: Data;
}

interface Data {
  totalUser?: number;
  totalFamily?: number;
  totalSingle?: number;
  totalAlive?: number;
  totalDeath?: number;
  totalMale?: number;
  totalFemale?: number;
  totalHannah?: number;
  totalSalamah?: number;
  totalAisyah?: number;
  totalMaryam?: number;
  totalZainab?: number;
  totalQomariyah?: number;
}