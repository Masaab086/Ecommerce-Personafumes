export type condition = {
  key: string;
  condition: string;
  value: any;
};

export type conditionList = condition[];

export type on = {
  tableName: string;
  condition: condition;
};

export type join = on[];

export type table =
  | "orderProduct"
  | "bottle"
  | "fragrance"
  | "bottleMedia"
  | "personalize"
  | "personalizeData"
  | "customer"
  | "orders"
  | "admin"
  | "payment"
  | "event"
  | "coupon"
  | "emailOtp"
  | "personalizationPrice"
  | "phoneOtp";
