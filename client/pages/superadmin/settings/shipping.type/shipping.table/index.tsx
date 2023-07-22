import { ShippingTypeModal } from "model/sales.tax.modal";
import { FC, useState } from "react";
import { MdEdit } from "react-icons/md";
import AddShipping from "../add.shipping";
import UpdateShipping from "../update.shipping";

interface ShippingTypesTableProps {
  shippingData: ShippingTypeModal[];
  setShippingData: Function;
}

const ShippingTypesTable: FC<ShippingTypesTableProps> = ({
  shippingData,
  setShippingData,
}) => {
  const [sideBarDisplay, setSideBarDisplay] = useState<boolean>(false);
  const [sideBarUpdateDisplay, setSideBarUpdateDisplay] =
    useState<boolean>(false);
  const [shipping, setShipping] = useState<ShippingTypeModal>({
    country: "",
    domesticRate: 0,
    internationalRate: 0,
    shippingType: "",
    state: "",
    shippingTypeId: "",
  });

  const handleEditClick = (shipping: ShippingTypeModal) => {
    setShipping(shipping);
    setSideBarUpdateDisplay(true);
  };

  return (
    <div>
      <div className="flex justify-between my-4">
        <div className="text-xl font-bold">Shipping Rates Section</div>
        <button
          className="bg-yellow-400 hover:bg-white text-black py-2 px-4 rounded"
          onClick={() => setSideBarDisplay(true)}
        >
          Add New
        </button>
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Country
              </th>
              <th scope="col" className="py-3 px-6">
                State
              </th>
              <th scope="col" className="py-3 px-6">
                Shipping Type
              </th>
              <th scope="col" className="py-3 px-6">
                Domestic Rate
              </th>
              <th scope="col" className="py-3 px-6">
                International Rate
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {shippingData.map((shipping: ShippingTypeModal, index: number) => (
              <tr
                className=" border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                key={index}
              >
                <th
                  scope="row"
                  className="py-4 px-6 font-medium whitespace-nowrap text-white"
                >
                  {shipping.country}
                </th>
                <td className="py-4 px-6">{shipping.state}</td>
                <td className="py-4 px-6">{shipping.shippingType}</td>
                <td className="py-4 px-6">{shipping.domesticRate}</td>
                <td className="py-4 px-6">{shipping.internationalRate}</td>
                <td className="py-4 px-6">
                  <MdEdit
                    className="text-white h-6 w-6 cursor-pointer"
                    onClick={() => handleEditClick(shipping)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddShipping
        setShippingData={setShippingData}
        setSideBarDisplay={setSideBarDisplay}
        sideBarDisplay={sideBarDisplay}
      />

      <UpdateShipping
        setShippingData={setShippingData}
        setSideBarDisplay={setSideBarUpdateDisplay}
        sideBarDisplay={sideBarUpdateDisplay}
        shipping={shipping}
      />
    </div>
  );
};

export default ShippingTypesTable;
