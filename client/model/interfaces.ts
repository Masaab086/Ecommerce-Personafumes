export interface Media {
  mediaId: string;
  bottleId: string;
  side: string;
  imagePointer: string;
}

export interface PersonalizeInfo {
  artPrice: number;
  backImagePointer: string;
  bottleId: string;
  frontImagePointer: string;
  mediaPrice: string;
  minQuantity: number;
  personalizationPriceId: string;
  textPrice: number;
}

export interface BottleVariant {
  variantType: string;
  variantName: string;
  frontImage: string;
  backImage: string;
  variantId: string;
  bottleId: string;
}

export interface Bottle {
  availableQuantity: number;
  bottleId: string;
  bottleName: string;
  capacity: string;
  categoryType: string;
  dateCreated: string;
  deleted: boolean;
  description: string;
  price: number;
  published: boolean;
  unitOfMeasure: string;
  personalizable: boolean;
  media: Media[];
  personalizeInfo: PersonalizeInfo[];
  variants: BottleVariant[];

}

export interface Fragrance {
  availableUnites: number;
  deleted: boolean;
  fragranceId: string;
  fragranceName: string;
  gender: string;
  inspiration: string;
  published: boolean;
  target: string;
  unitCost: number;
  unitOfMeasure: string;
}

export interface Review {
  reviewId: string;
  bottleId: string;
  customerId: string;
  rating: Number;
  comment: string;
  dateTime: string;
  fragranceId: string;
  orderId: string;
  reviewedBy: {
    customerImage: string;
    customerName: string;
  };
}