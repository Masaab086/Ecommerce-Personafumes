export interface SalesTaxDataModal {
  salesTaxId: string;
  country: string;
  salesTax: number;
}

export interface SalesTaxModal {
  salesTaxId: string;
  salesTax: number;
}

export interface ShippingTypeModal {
  shippingTypeId?: string;
  country: string;
  state: string;
  shippingType: string;
  domesticRate: number;
  internationalRate: number;
}

export interface ShippingModal {
  shipping: ShippingTypeModal[]
}