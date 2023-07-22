import React, { FC, useState } from "react";

import { ShippingTypeModal } from "model/sales.tax.modal";

import ShippingTypesTable from "./shipping.table";

interface ShippingTypeProps {
  // about: any;
  shippingData: ShippingTypeModal[];
  setShippingData: Function;
}

const ShippingType: FC<ShippingTypeProps> = ({
  shippingData,
  setShippingData,
}) => {
  return (
    <div className="py-5 border-b">
      <ShippingTypesTable
        shippingData={shippingData}
        setShippingData={setShippingData}
      />
    </div>
  );
};

export default ShippingType;
