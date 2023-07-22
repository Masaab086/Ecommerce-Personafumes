// paymentId varchar(255) not null unique,
// customerId varchar(255) not null,
// orderId varchar(255) not null,
// paidAmount decimal,
// paymentStatus varchar(255) default "unverfied",
// dateTime datetime default now(),
// sessionId varchar(255) not null,

export type payment = {
  paymentId: string;
  customerId: string;
  orderId: string;
  paidAmount: Number;
  paymentStatus: string;
  dateTime?: Date;
  sessionId: string;
};
