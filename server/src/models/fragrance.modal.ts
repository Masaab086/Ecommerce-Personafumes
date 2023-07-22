export type fragrance = {
  fragranceId?: string;
  fragranceName: string;
  inspiration: string;
  target: string;
  unitOfMeasure?: string;
  unitCost: Number;
  availableUnites: Number;
  gender: string;
};

// fragranceName varchar(255) not null unique,
// type varchar(255) not null,
// inspiration varchar(255) not null,
// target varchar(255) not null,
// unitOfMeasure varchar(255) not null default "ML",
// unitCost decimal not null,
// availableUnites int not null,
