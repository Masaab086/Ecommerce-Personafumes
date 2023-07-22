import Link from "next/link";
import { FC, useState } from "react";
import { FaDownload } from "react-icons/fa";
import InvoiceModal from "./invoice.modal";

interface OrderProductsModalProps {
  handleModelShow: () => void;
  modal: boolean;
  orderProducts: Array<any>;
  customer: any;
}

const OrderProductsModal: FC<OrderProductsModalProps> = ({
  handleModelShow,
  modal,
  orderProducts,
  customer,
}) => {
  const [invoice, setInvoice] = useState<any>();
  const [invoiceModal, setInvoiceModal] = useState(false);

  const handleInvoiceModal = (link: any) => {
    setInvoiceModal(!invoiceModal);
    setInvoice(link);
  };

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
              onClick={handleModelShow}
            >
              X
            </button>
          </div>
          <div className="relative p-4">
            <div className="flex justify-center">
              <table className="w-full m-1 border-separate border-spacing-y-3	">
                <thead className="w-full">
                  <tr className="w-full w-full bg-[#222328] p-8 border-[#9E9E9E] rounded-md">
                    <td className="px-2 py-2">Order Id</td>
                    <td className="px-2 py-2">Date</td>
                    <td className="px-2 py-2">Order Status</td>
                    <td className="px-2 py-2">Total</td>
                    <td className="px-2 py-2">Invoice</td>
                    {/* <td className="px-2 py-2">Personalize Cost</td>
                    <td className="px-2 py-2">Quantity</td>
                    <td className="px-2 py-2">Weight</td>
                    <td className="px-2 py-2">Total Cost</td> */}
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
                        <td className="py-2 px-2">{data.orderId}</td>
                        <td className="py-2 px-2">
                          {data?.dateTime.split("T")[0]}
                        </td>
                        <td className="py-2 px-2">{data.orderStatus}</td>
                        <td className="py-2 px-2">Rs. {data.orderTotal}</td>
                        <td className="py-2 px-2">
                          {/* {data?.invoice ? (
                            <Link href={data?.invoice} target="_blank">
                              <a className="hover:underline" target={"_blank"}>
                                Download Invoice
                              </a>
                            </Link>
                          ) : (
                            <></>
                          )} */}
                          <FaDownload
                            onClick={() => handleInvoiceModal(data)}
                            className="p-1 h-8 w-8 hover:bg-slate-700 cursor-pointer rounded text-white"
                          />
                        </td>
                        {/* <td className="py-2 px-2">${data.fragranceCost}</td>
                        <td className="py-2 px-2">
                          ${data.personalizationCost}
                        </td>
                        <td className="py-2 px-2">{data.quantity}</td>
                        <td className="py-2 px-2">
                          {data.weight} {data.bottle.unitOfMeasure}
                        </td>
                        <td className="py-2 px-2">${data.totalCost}</td> */}

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
        customer={customer}
      />
    </div>
  );
};

export default OrderProductsModal;
