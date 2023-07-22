export interface AddCouponModel {
  campaignName: string;
  code: string;
  endDate: Date;
  startDate: Date;
  discount: number;
  minAmount: number;
}
