import Image from "next/image";
import { FC, useRef } from "react";
import { FaDownload } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";

// Create new plugin instance

interface InvoiceModalProps {
  handleModelShow: Function;
  modal: boolean;
  invoice: any;
}

const InvoiceModal: FC<InvoiceModalProps> = ({
  handleModelShow,
  modal,
  invoice,
}) => {
  const printInvoice = useRef<HTMLDivElement>(null);

  const handlePrintInvoice = useReactToPrint({
    content: () => printInvoice.current,
    documentTitle: "New Document",
    pageStyle: "print",
  });
  return (
    <div
      className={`modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto bg-gray-500/50 ${
        !modal && "hidden"
      }`}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-scrollable relative w-11/12 mx-auto pointer-events-none top-10">
        <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-black bg-clip-padding rounded-md outline-none text-white">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-500 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-white">
              Order Products
            </h5>
            <button
              type="button"
              className=" box-content w-4 h-4 p-1 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:opacity-75 hover:no-underline"
              onClick={() => handleModelShow(false)}
            >
              X
            </button>
          </div>
          <div className="relative p-4" ref={printInvoice}>
            <div className="p-8 bg-white text-black">
              <div className="relative h-10 w-60 mx-1">
                <Image src="/images/personalogo.png" alt="personafumes" fill />
              </div>
              <div className="flex my-2 mt-10">
                <div className="w-40">Guest Name : </div>
                <span className="ml-2 ">
                  {invoice?.supplierInvoiceData?.email}
                </span>
              </div>
              <div className="flex my-2">
                <div className="w-40">Order ID : </div>
                <span className="ml-2">{invoice?.guestOrderId}</span>
              </div>

              <div className="flex my-2">
                <div className="w-40">Shipping Address : </div>
                <span className="ml-2">
                  {invoice?.supplierInvoiceData?.shippingAddress}
                </span>
              </div>
              <div className="flex my-2">
                <div className="w-40">Order Date : </div>
                <span className="ml-2">
                  {invoice?.supplierInvoiceData?.orderDate}
                </span>
              </div>
              {/* <div className="flex my-2">
                <div className="w-40">Delivery Before : </div>
                <span className="ml-2 underline">Azam Dildar</span>
              </div> */}

              <div className="flex">
                <table className="mx-4 border-collapse border border-2 border-black">
                  <thead>
                    <tr>
                      <th className="border border-2 border-black" colSpan={4}>
                        Bottle/Fragrance
                      </th>
                    </tr>
                    <tr>
                      <th className="border border-2 border-black p-1">
                        Bottle Id
                      </th>
                      <th className="border border-2 border-black p-1">
                        Fragrance Id
                      </th>
                      <th className="border border-2 border-black p-1">
                        Fluid Qty
                      </th>
                      <th className="border border-2 border-black p-1">
                        Quantity
                      </th>
                      <th className="border border-2 border-black p-1">
                        <div className="flex">
                          <div className="w-40">Text</div>
                          <div className="w-20">Font</div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice?.supplierInvoiceData?.products?.map(
                      (item: any, index: number) => (
                        <tr key={index}>
                          <td className="border border-2 border-black p-1">
                            {item.bottleId}
                          </td>
                          <td className="border border-2 border-black p-1">
                            {item.fragranceId}
                          </td>
                          <td className="border border-2 border-black p-1">
                            {item.fluidQuantity}
                          </td>
                          <td className="border border-2 border-black p-1">
                            {item.quantity}
                          </td>
                          <td>
                            {item?.personalize?.map(
                              (persona: any, key: number) => (
                                <div className="flex" key={key}>
                                  <div className="w-40 border-r border-b border-black">
                                    {persona.text}
                                  </div>
                                  <div className="w-40 border-b border-black">
                                    {persona.font}
                                  </div>
                                </div>
                              )
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              <div className="grid grid-cols-2 my-2">
                {invoice?.supplierInvoiceData?.images.map(
                  (image: string, index: number) => (
                    <div className="relative h-80 w-80" key={index}>
                      <Image src={image} alt="personalization" fill />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-500 rounded-b-md">
            <button
              type="button"
              className="flex justify-center items-center mx-4 px-6 py-1.5 bg-yellow-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={handlePrintInvoice}
            >
              Download
              <FaDownload className="p-1 h-6 w-6 cursor-pointer rounded text-white" />
            </button>
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => handleModelShow(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
