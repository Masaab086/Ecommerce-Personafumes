export type bottle = {
  bottleId?: string;
  capacity: Number;
  availableQuantity: Number;
  price: Number;
  unitOfMeasure?: string;
  personalizable: boolean;
  published: boolean;
  categoryType: string;
  bottleName: string;
};

export type personalization = {
  personalizationPriceId: string;
  bottleId: string;
  textPrice: Number;
  artPrice: Number;
  mediaPrice: Number;
  minQuantity: Number;
  backImagePointer: string;
  frontImagePointer: string;
};
