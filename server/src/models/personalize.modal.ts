export type personalize = {
  personalizeId?: string;
  image: string;
  artImage: string;
  uploadImage: string;
  text: string;
  font: string;
};

export type personalizeDataList = personalizeData[];
export type personalizeData = {
  personalizeDataId: string;
  personalizeId: string;
  orderProductId: string;
  personalizeCost: Number;
};
