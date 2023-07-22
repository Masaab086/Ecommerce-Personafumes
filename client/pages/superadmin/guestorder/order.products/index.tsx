import { FC, useEffect, useState } from "react";
import InvoiceModal from "../invoice.modal";
import SupplierModal from "../supplier.modal";

interface OrderProductsModalProps {
  handleModelShow: () => void;
  modal: boolean;
  orderProducts: Array<any>;
  orderDetail: any;
  suppliers: Array<any>;
  setSupplier: Function;
  supplier: string;
}

const OrderProductsModal: FC<OrderProductsModalProps> = ({
  handleModelShow,
  modal,
  orderProducts,
  orderDetail,
  suppliers,
  setSupplier,
  supplier,
}) => {
  const [invoice, setInvoice] = useState<any>();
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [assignSupplier, setAssignSupplier] = useState<any>();

  const handleInvoiceModal = () => {
    setInvoiceModal(!invoiceModal);
    setInvoice(orderDetail);
  };

  const handleSupplierModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (suppliers.length && supplier)
      setAssignSupplier(suppliers.find((item) => item.adminId === supplier));
    else setAssignSupplier(null);

    return () => setAssignSupplier(null);
  }, [supplier, suppliers]);

  return (
    <div
      className={`modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto bg-gray-500/50 ${
        !modal && "hidden"
      }`}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-scrollable relative w-10/12 mx-auto pointer-events-none top-10">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-black bg-clip-padding rounded-md outline-none text-white">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-500 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-white">
              Order Products
            </h5>
            <button
              type="button"
              className=" box-content w-4 h-4 p-1 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:opacity-75 hover:no-underline"
            >
              X
            </button>
          </div>
          <div className="relative p-4">
            <div className="grid grid-cols-2">
              <div className="flex">
                <div className="w-40">Order ID :</div>
                <div> {orderDetail?.guestOrderId} </div>
              </div>
              <div className="flex">
                <div className="w-40">Supplier Invoice : </div>
                <div
                  className="hover:underline cursor-pointer"
                  onClick={handleInvoiceModal}
                >
                  Click
                </div>
              </div>
              <div className="flex">
                <div className="w-40">Assigned Supplier : </div>
                {assignSupplier ? (
                  <div>
                    {assignSupplier?.firstName + " " + assignSupplier?.lastName}
                  </div>
                ) : (
                  <div>
                    Not Assigned{" "}
                    <span
                      className="px-8 hover:underline cursor-pointer"
                      onClick={handleSupplierModal}
                    >
                      Click here to assign!
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <table className="w-full m-1 border-separate border-spacing-y-3	">
                <thead className="w-full">
                  <tr className="w-full w-full bg-[#222328] p-8 border-[#9E9E9E] rounded-md">
                    <td className="px-2 py-2">Bottle Name</td>
                    <td className="px-2 py-2">Fragrance Name</td>
                    <td className="px-2 py-2">Variant</td>
                    {/* <td className="px-2 py-2">Category</td> */}
                    <td className="px-2 py-2">Bottle Cost</td>
                    <td className="px-2 py-2">Fragrance Cost</td>
                    <td className="px-2 py-2">Personalize Cost</td>
                    <td className="px-2 py-2">Quantity</td>
                    <td className="px-2 py-2">Weight</td>
                    <td className="px-2 py-2">Total Cost</td>
                    {/* <td className="px-2 py-2">DETAILS</td> */}
                    {/*  <td className="px-2 py-2">ACTIONS</td> */}
                  </tr>
                </thead>

                <tbody>
                  {orderProducts.map((data: any, key) => {
                    return (
                      <tr
                        className="text-sm text-[#9E9E9E] my-3 bg-[#222328]  rounded-md "
                        key={key}
                      >
                        <td className="py-2 px-2">{data.bottle.bottleName}</td>
                        <td className="py-2 px-2">
                          {data.fragrance.fragranceName}
                        </td>
                        <td className="py-2 px-2">
                          {data?.variant?.variantName}
                        </td>
                        {/* <td className="py-2 px-2">
                          {data.bottle.categoryType}
                        </td> */}
                        <td className="py-2 px-2">Rs. {data.bottle.price}</td>
                        <td className="py-2 px-2">Rs. {data.fragranceCost}</td>
                        <td className="py-2 px-2">
                          Rs. {data.personalizationCost}
                        </td>
                        <td className="py-2 px-2">{data.quantity}</td>
                        <td className="py-2 px-2">
                          {data.weight} {data.bottle.unitOfMeasure}
                        </td>
                        <td className="py-2 px-2">Rs. {data.totalCost}</td>

                        {/* <td className="py-1 px-2 text-center">
                          <div
                            className="hover:bg-slate-600 w-8 rounded-full cursor-pointer"
                            // onClick={(): Promise<boolean> =>
                            //   router.push("/superadmin/products/" + data.productId)
                            // }
                          >
                            <VisibilityOutlinedIcon />
                          </div>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-500 rounded-b-md">
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={handleModelShow}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <InvoiceModal
        handleModelShow={setInvoiceModal}
        modal={invoiceModal}
        invoice={invoice}
      />
      <SupplierModal
        handleModelShow={handleSupplierModal}
        modal={showModal}
        suppliers={suppliers}
        orderId={orderDetail?.guestOrderId}
        setSupplier={setSupplier}
        supplier={supplier}
      />
    </div>
  );
};

export default OrderProductsModal;
