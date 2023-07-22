export type product = {
  name: string;
  quanity: Number;
  total: Number;
};

export interface invoice {
  customerName: string;
  customerAddress: string;
  products: product[];
  total: Number;
  subTotal: Number;
  saleTax: Number;
}
