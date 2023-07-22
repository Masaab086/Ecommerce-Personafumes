import Image from "next/image";
import { FC, useRef } from "react";
import { FaDownload } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";

// Create new plugin instance

interface InvoiceModalProps {
  handleModelShow: Function;
  modal: boolean;
  invoice: any;
  customer: any;
}

const InvoiceModal: FC<InvoiceModalProps> = ({
  handleModelShow,
  modal,
  invoice,
  customer,
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
      <div className="modal-dialog modal-dialog-scrollable relative w-10/12 mx-auto pointer-events-none top-10">
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

              <div className="flex justify-between">
                <div>Phone: 888.302.1512</div>
                {/* <div>Invoice # 0000</div> */}
              </div>

              <div className="flex justify-between">
                <div>Fax: 888.302.1512</div>
                <div>Date # {invoice?.dateTime.split("T")[0]}</div>
              </div>

              <div className="flex my-2 mt-10">
                <div className="w-40">Recipient Name : </div>
                <span className="ml-2 ">
                  {customer?.firstName} {customer?.lastName}
                </span>
              </div>
              <div className="flex my-2">
                <div className="w-40">Recipient Email : </div>
                <span className="ml-2">{customer?.userEmail}</span>
              </div>
              <div className="flex my-2">
                <div className="w-40">Street Address : </div>
                <span className="ml-2 ">{customer?.shippingAddress}</span>
              </div>
              <div className="flex my-2">
                <div className="w-40">City, ST, Zip Code : </div>
                <span className="ml-2 ">
                  {customer?.city}, {customer?.state} {customer?.zipCode}
                </span>
              </div>
              <div className="flex my-2">
                <div className="w-40">Phone : </div>
                <span className="ml-2">{customer?.phone}</span>
              </div>

              <div className="my-6">
                <div className="font-bold">Comments or Special Instruction</div>
                <div>Comment....</div>
              </div>

              <table className="w-full">
                <thead>
                  <tr>
                    <th className="border border-2 border-black p-1">POS</th>
                    <th className="border border-2 border-black p-1">
                      PAYMENT MODE
                    </th>
                    <th className="border border-2 border-black p-1">
                      SHIPPING METHOD
                    </th>
                    <th className="border border-2 border-black p-1">
                      SHIPPING COMPANY
                    </th>
                    <th className="border border-2 border-black p-1">
                      TRACKING #
                    </th>
                    <th className="border border-2 border-black p-1">ETA</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-2 border-black p-1">Online</td>
                    <td className="border border-2 border-black p-1">
                      Credit Card
                    </td>
                    <td className="border border-2 border-black p-1">
                      Air Freight
                    </td>
                    <td className="border border-2 border-black p-1">FedEx</td>
                    <td className="border border-2 border-black p-1">111111</td>
                    <td className="border border-2 border-black p-1"></td>
                  </tr>
                </tbody>
              </table>

              <table className="w-full mt-6">
                <thead>
                  <tr>
                    <th className="border border-2 border-black p-1">Bottle</th>
                    <th className="border border-2 border-black p-1">
                      Fragrance
                    </th>
                    <th className="border border-2 border-black p-1">WEIGHT</th>
                    <th className="border border-2 border-black p-1">
                      FRAGRANCE COST
                    </th>

                    <th className="border border-2 border-black p-1">
                      QUANTITY
                    </th>
                    <th className="border border-2 border-black p-1">
                      PERSONALIZATION COST
                    </th>
                    <th className="border border-2 border-black p-1">
                      BOTTLE COST
                    </th>
                    <th className="border border-2 border-black p-1">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice?.orderProducts.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="border border-2 border-black p-1">
                        {item.bottle.bottleName}
                      </td>
                      <td className="border border-2 border-black p-1">
                        {item.fragrance.inspiration}
                      </td>
                      <td className="border border-2 border-black p-1">
                        {item.weight}
                      </td>

                      <td className="border border-2 border-black p-1">
                        Rs. {item.weight * item.fragrance.unitCost}
                      </td>
                      <td className="border border-2 border-black p-1">
                        {item.quantity}
                      </td>
                      <td className="border border-2 border-black p-1">
                        Rs. {item.personalizationCost}
                      </td>
                      <td className="border border-2 border-black p-1">
                        Rs. {item.bottleCost}
                      </td>
                      <td className="border border-2 border-black p-1">
                        Rs.{" "}
                        {Number(item.bottleCost) +
                          Number(item.fragranceCost) +
                          Number(item.personalizationCost)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end">
                <div className="flex-col">
                  <div className="flex">
                    <div className="w-52">SUBTOTAL:</div>
                    <div>{invoice?.orderSubtotal}</div>
                  </div>
                  <div className="flex">
                    <div className="w-52">SALES TAX:</div>
                    <div>{0.03 * invoice?.orderSubtotal}</div>
                  </div>
                  <div className="flex">
                    <div className="w-52">SHIPPING & HANDLING:</div>
                    <div>{invoice?.shippingCost}</div>
                  </div>
                  <div className="flex">
                    <div className="w-52">TOTAL DUE:</div>
                    <div>
                      {Number(invoice?.orderSubtotal) +
                        0.03 * invoice?.orderSubtotal +
                        Number(invoice?.shippingCost)}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p>
                  To check the status of your order, please login to
                  PersonaFumes Corp..
                </p>
                <p>
                  If you have any questions concerning this invoice, contact:
                  Your Name at 888.302.1512 or Email.
                </p>
              </div>
              <div className="font-bold flex justify-center">
                THANK YOU FOR YOUR BUSINESS!
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
