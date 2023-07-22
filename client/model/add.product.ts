export interface PricingModal {
  unitOfMeasure: string;
  price: number;
}

export interface Variant {
  variantType: string;
  variantName: string;
  frontImage: string;
  backImage: string;
}

export interface UpdateVariant extends Variant {
  variantId?: string;
  bottleId?: string;
}

export interface MediaModal {
  imagePointer: string;
}

export interface AddProductModal {
  bottleName: string;
  personalizable?: boolean;
  categoryType: string;
  availableQuantity: number;
  price: number;
  capacity: number;
  description: string;
  variants: Variant[] | UpdateVariant[]
}

export interface AddFragranceModal {
  fragranceName: string;
  inspiration: string;
  unitCost: number;
  unitOfMeasure: string;
  availableUnites: number;
  gender: string;
  target: string;
}