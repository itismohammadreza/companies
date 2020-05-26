export type CompanyType = 'محصولات غذایی' | 'لوازم خانگی' | 'لوازم الکترونیکی';

export class Company {
  id: number;
  title: string;
  phone: number;
  type: CompanyType;
}
