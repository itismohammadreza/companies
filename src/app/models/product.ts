export type ProductState = 'فعال' | 'غیر فعال';

export class Product {
  id: number;
  companyId: number;
  title: string;
  createDate: Date;
  state: ProductState;
}
