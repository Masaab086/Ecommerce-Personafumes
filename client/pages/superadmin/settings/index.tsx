import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import SuperAdminLayout from "layout/superadmin.layout";
import SalesTax from "./sales.tax";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import ShippingType from "./shipping.type";
import { SalesTaxModal, ShippingTypeModal } from "model/sales.tax.modal";

const Reports: NextPage = () => {
  const [salesTaxData, setSalesTaxData] = useState<SalesTaxModal>({
    salesTaxId: "",
    salesTax: 0,
  });

  const [shippingData, setShippingData] = useState<ShippingTypeModal[]>([
    {
      shippingType: "",
      state: "",
      country: "",
      domesticRate: 0,
      internationalRate: 0,
      shippingTypeId: "",
    },
  ]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/salestax`)
      .then(({ data }) => {
        setSalesTaxData(data.salesTaxData);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/shipping`)
      .then(({ data }) => {
        setShippingData(data.shippings);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
      });
  }, []);

  return (
    <SuperAdminLayout title="Settings" tab={1}>
      <div>
        <SalesTax
          salesTaxData={salesTaxData}
          setSalesTaxData={setSalesTaxData}
        />
        <ShippingType
          shippingData={shippingData}
          setShippingData={setShippingData}
        />
      </div>
    </SuperAdminLayout>
  );
};

export default Reports;
