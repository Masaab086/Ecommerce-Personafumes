import { invoice, product } from "../models/invoice.modal";

export const createHtmlInvoice = (data: invoice): string => {
  let body: string = `  <div
      style="
        width: 100%;
        height: 100%;
        background-color: gray;
        color: goldenrod;
        font-family: sans-serif;
      "
    >
      <div
        style="
          width: 50%;
          margin-left: auto;
          margin-right: auto;
          background-color: #2b2c28;
          padding: 3rem;
        "
      >
        <div style="display: flex; align-items: center; width: 100%">
          <div style="width: 100%; margin: 1rem">PERSONAFUMES</div>
          <div style="width: 100%; margin: 1rem">
            <p style="text-align: right">order No: 1232112321</p>
            <p style="text-align: right">Payment Metho: Credit Card</p>
            <p style="text-align: right">Shipping: Standard</p>
          </div>
        </div>

        <div style="display: flex">
          <div style="width: 30%">
            <p style="font-size: 1.4rem; font-weight: bold; text-align: center">
              BILL TO
            </p>
            <p style="text-align: center; color: white">${data.customerName}</p>
          </div>
          <div style="width: 30%">
            <p style="font-size: 1.4rem; font-weight: bold; text-align: center">
              SHIPP TO
            </p>
            <p style="text-align: center; color: white">${
              data.customerAddress
            }</p>
          </div>
        </div>
        <table
          style="
            width: 100%;
            padding: 5rem;
            border-collapse: collapse;
            border-bottom: 1px solid goldenrod;
          "
        >
          <thead>
            <tr
              style="
                font-size: 1.4rem;
                font-weight: bold;
                border-top: 1px solid goldenrod;
                border-bottom: 1px solid goldenrod;
              "
            >
              <td style="width: 50%; padding: 1rem">Description</td>
              <td style="width: 25%; padding: 1rem; text-align: center">
                Quantity
              </td>
              <td style="width: 25%; padding: 1rem; text-align: center">
                Total
              </td>
            </tr>
          </thead>

          <tbody>

          ${data.products.map((product: product) => {
            return `<tr>
              <td style="padding: 2rem; color: white">${product.name}</td>
              <td style="text-align: center; padding: 2rem; color: white">${product.quanity}</td>
              <td style="text-align: center; padding: 2rem; color: white">
                $ ${product.total}
              </td>
            </tr>`;
          })}
            
          </tbody>
        </table>

        <div style="display: flex; justify-content: end; margin: 3rem">
          <div style="width: 40%">
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin: 1rem;
                border-bottom: 1px solid goldenrod;
                padding: 0.2rem;
              "
            >
              <div style="color: white">SUB TOTAL</div>
              <div style="color: white">$ ${data.subTotal}</div>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin: 1rem;
                border-bottom: 1px solid goldenrod;
                padding: 0.2rem;
              "
            >
              <div style="color: white">SALE TAX</div>
              <div style="color: white">$ ${data.total}</div>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                margin: 1rem;
                border-bottom: 1px solid goldenrod;
                padding: 0.2rem;
              "
            >
              <div style="color: white">TOTAL</div>
              <div style="color: white">${data.total}</div>
            </div>
          </div>
        </div>

        <div style="width: 40%">
          <p style="font-size: 1rem; font-weight: bold">
            THANK YOU FOR YOUR BUSNIESS
          </p>
          <a
            style="font-weight: 2rem; text-align: center; text-decoration: none"
            >personafumes.com</a
          >
        </div>
      </div>
    </div>`;

  return "<h1> HELLO</h1>";
};
