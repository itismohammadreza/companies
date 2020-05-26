export type ProductState = 'فعال' | 'غیر فعال';

export class Product {
  id: number;
  title: string;
  companyId: number;
  createDate: Date;
  state: ProductState;
}
