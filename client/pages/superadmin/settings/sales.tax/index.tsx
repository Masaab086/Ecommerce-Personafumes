import React, { FC, FormEvent, useState } from "react";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { ImSpinner6 } from "react-icons/im";
import { toast } from "react-toastify";

interface SalesTaxSectionProps {
  salesTaxData: { salesTaxId: string; salesTax: number };
  setSalesTaxData: Function;
}

const SalesTax: FC<SalesTaxSectionProps> = ({
  salesTaxData,
  setSalesTaxData,
}) => {
  const [updatebtnClick, setUpdateBtnClick] = useState<boolean>(false);

  const handleSectionUpdate = (e: FormEvent) => {
    e.preventDefault();
    setUpdateBtnClick(true);

    axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/salestax`, salesTaxData)
      .then(({ data }) => {
        console.log(data);
        setUpdateBtnClick(false);
        toast.success(data.message);
      })
      .catch((err) => {
        setUpdateBtnClick(false);
        toast.error(handleAxiosResponseError(err));
        console.log(handleAxiosResponseError(err));
      });
  };

  return (
    <div className="py-5 border-b">
      <div className="text-xl font-bold">Sales Tax</div>
      <form onSubmit={handleSectionUpdate} className="flex my-4">
        <div className="grid grid-cols-2 gap-12">
          <div className="grid grid-cols-2">
            <label>Pakistan : </label>
            <input
              className="col-start-2 rounded bg-gray-700 border border-white p-1"
              type={"number"}
              value={salesTaxData.salesTax}
              onChange={(e) =>
                setSalesTaxData({ ...salesTaxData, salesTax: e.target.value })
              }
            />
          </div>
        </div>
        <button
          className="bg-white rounded text-black p-2 px-4 hover:bg-yellow-200 h-10 w-24"
          type="submit"
        >
          {!updatebtnClick ? (
            "Update"
          ) : (
            <ImSpinner6 className="animate-spin h-6 w-6 text-black p-0 mx-auto" />
          )}
        </button>
      </form>
    </div>
  );
};

export default SalesTax;
