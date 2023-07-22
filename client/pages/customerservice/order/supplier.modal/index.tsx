import { ChangeEvent, FC, useState } from "react";
import { handleAxiosResponseError } from "utils";
import axios from "config/axios";
import { toast } from "react-toastify";

// Create new plugin instance

interface SupplierModalProps {
  handleModelShow: Function;
  modal: boolean;
  suppliers: Array<any>;
  orderId: string;
  setSupplier: Function;
  supplier: string;
}

const SupplierModal: FC<SupplierModalProps> = ({
  handleModelShow,
  modal,
  suppliers,
  orderId,
  setSupplier,
  supplier,
}) => {
  const handleSupplier = (e: ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    if (target) {
      console.log(target.value);
      setSupplier(target.value);
    }
  };

  const handleOrderAssign = () => {
    if (supplier.length <= 0) {
      toast.warning("Please Select a Supplier");
      return;
    }
    const data = {
      supplierId: supplier,
      orderId,
    };
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/supplier/assign/order`,
        data
      )
      .then(({ data }) => {
        console.log(data);
        toast.success(data.message);
      })
      .catch((err) => {
        toast.error(handleAxiosResponseError(err));
        console.log(handleAxiosResponseError(err));
      });
  };

  return (
    <div
      className={`modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto bg-gray-500/50 ${
        !modal && "hidden"
      }`}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-scrollable relative w-80 mx-auto pointer-events-none top-10">
        <div className="modal-content border-none shadow-lg relative h-96 flex flex-col w-full pointer-events-auto bg-black bg-clip-padding rounded-md outline-none text-white">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-500 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-white">
              Suppliers
            </h5>
            <button
              type="button"
              className=" box-content w-4 h-4 p-1 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:opacity-75 hover:no-underline"
              onClick={() => handleModelShow(false)}
            >
              X
            </button>
          </div>
          <div className="relative p-4">
            <select
              className="bg-transparent w-full text-base px-4 py-1  border border-[#938E8E] rounded-md"
              value={supplier}
              onChange={handleSupplier}
            >
              <option className="bg-black" value={""}>
                Supplier
              </option>
              {suppliers.map((item, index) => (
                <option className="bg-black" value={item.adminId} key={index}>
                  {item.firstName + " " + item.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="modal-footer flex flex-shrink-0 mt-auto flex-wrap items-center justify-end p-4 border-t border-gray-500 rounded-b-md">
            <button
              type="button"
              className="inline-block mx-1 px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => handleModelShow(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={handleOrderAssign}
            >
              Assigned Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierModal;
