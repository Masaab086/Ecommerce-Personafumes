import React, { ChangeEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import CustomerServiceLayout from "layout/customer.service.layout";
import Pagination from "components/pagination";

const Reports: NextPage = () => {
  const [allOrders, setAllOrders] = useState<any>([]);
  const [orders, setOrders] = useState<Array<any>>([]);
  const [report, setReport] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, SetSortOrder] = useState<string>("");
  const [postsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/orders`)
      .then(({ data }) => {
        setAllOrders(data.orders);
        setOrders(data.orders);
        // console.log(data.orders);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
      });
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/sales`)
      .then(({ data }) => {
        setReport(data.reports);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
      });
  }, []);

  function compareDate(a: any, b: any) {
    if (a.dateTime > b.dateTime) {
      return -1;
    }
    if (a.dateTime < b.dateTime) {
      return 1;
    }
    return 0;
  }

  function compareAmount(a: any, b: any) {
    if (a.orderTotal > b.orderTotal) {
      return -1;
    }
    if (a.orderTotal < b.orderTotal) {
      return 1;
    }
    return 0;
  }

  const handleSortOrders = (e: ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    if (target) {
      const value = target.value;
      SetSortOrder(value);
      if (value === "") setOrders(allOrders);
      else if (value === "date") setOrders([...orders].sort(compareDate));
      else if (value === "amount") setOrders([...orders].sort(compareAmount));
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentOrders = orders.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <CustomerServiceLayout title="Reports" tab={1}>
      <div>
        <div className="flex justify-around my-2">
          <div className="bg-[#0E9F6E] text-center px-20 py-4 rounded">
            <CreditCardIcon fontSize="large" />
            <div className="font-thin my-2">Total Sales</div>
            <div className="text-2xl font-bold">Rs. {report.sale}</div>
          </div>
          <div className="bg-[#3F83F8] text-center px-20 py-4 rounded">
            <ShoppingCartOutlinedIcon fontSize="large" />
            <div className="font-thin my-2">This Month</div>
            <div className="text-2xl font-bold">
              Rs. {report.currentMonthSales}
            </div>
          </div>
          <div className="bg-[#DBC864] text-center px-20 py-4 rounded">
            <ContentCopyIcon fontSize="large" />
            <div className="font-thin my-2">Today Order</div>
            <div className="text-2xl font-bold">
              Rs. {report.currentDaySales}
            </div>
          </div>
        </div>

        <div className="flex justify-around my-6">
          <div className="flex w-full mx-3 items-center p-3 rounded bg-[#1A1C23]">
            <div className="rounded-full m-2 p-1  bg-[#FF5A1F]">
              <ShoppingCartOutlinedIcon />
            </div>
            <div className="text-white px-3">
              <div>Total Order</div>
              <div>{report.totalOrders}</div>
            </div>
          </div>
          <div className="flex w-full mx-3 items-center p-3 rounded bg-[#1A1C23]">
            <div className="rounded-full m-2 p-1  bg-[#3F83F8]">
              <AutorenewOutlinedIcon />
            </div>
            <div className="text-white px-3">
              <div>Order Pending</div>
              <div>{report.pendingOrders}</div>
            </div>
          </div>
          <div className="flex w-full mx-3 items-center p-3 rounded bg-[#1A1C23]">
            <div className="rounded-full m-2 p-1 bg-[#0E9F6E]">
              <DoneOutlinedIcon />
            </div>
            <div className="text-white px-3">
              <div>Order Complete</div>
              <div>{report.completedOrders}</div>
            </div>
          </div>
          <div className="flex w-full mx-3 items-center p-3 rounded bg-[#1A1C23]">
            <div className="rounded-full m-2 p-1  bg-[#DBC864]">
              <KeyboardReturnOutlinedIcon />
            </div>
            <div className="text-white px-3">
              <div>Order Return</div>
              <div>{report.returnedOrders}</div>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className=" flex justify-between rounded-md">
          <div className="text-lg text-white">SALES</div>

          {/* <select className="bg-[#222328] focus:outline-none border-none rounded-md w-3/6 mx-4">
              <option>View sales by product category</option>
            </select> */}
          <div className="">
            <select
              className="bg-transparent px-4 py-1 border border-[#938E8E] rounded-md"
              value={sortOrder}
              onChange={handleSortOrders}
            >
              <option className="bg-black" value={""}>
                All
              </option>
              <option className="bg-black" value={"amount"}>
                Amount
              </option>
              <option className="bg-black" value={"date"}>
                Date
              </option>
            </select>
          </div>
        </div>
        {/* End of the input bar */}

        {/* Table section */}

        <div className="bg-[#222328] px-2">
          <table className="table w-full m-1 border-separate border-spacing-y">
            <thead className="w-full">
              <tr className="w-full table bg-[#222328] border-[#9E9E9E] rounded-md pr-4">
                <td className="px-2 py-1 w-[8%]">ORDER DATE</td>
                <td className="px-2 py-1 w-[30%]">DELIVERY ADDRESS</td>
                <td className="px-2 py-1 w-[12%]">PHONE</td>
                <td className="px-2 py-1 w-[10%]">PAYMENT METHOD</td>
                <td className="px-2 py-1 w-[10%]">ORDER AMMOUNT</td>
                <td className="px-2 py-1 w-[10%]">STATUS</td>
              </tr>
            </thead>

            <tbody className="block w-full">
              {currentOrders.map((data: any, key: number) => {
                return (
                  <tr
                    className="table text-sm text-white w-full my-3 border-[0.1px] border-[#363434] bg-[#222328] rounded-md "
                    key={key}
                  >
                    <td className="py-2 px-2 w-[8%]">
                      {data.dateTime?.split("T")[0]}
                    </td>
                    <td className="py-2 px-2 w-[30%]">
                      {data.shippingAddress}
                    </td>
                    <td className="py-2 px-2 w-[12%]">{data.phone}</td>
                    <td className="py-2 px-2 w-[10%]">Credit Card</td>
                    <td className="py-2 px-2 w-[10%]">Rs. {data.orderTotal}</td>
                    <td className="py-2 px-2 w-[10%]">
                      {data.orderStatus === "Processing" && (
                        <div className="rounded-xl bg-[#1054B9] text-center text-white py-1">
                          {data.orderStatus}
                        </div>
                      )}
                      {data.orderStatus === "Delivered" && (
                        <div className="rounded-xl bg-green-600 text-white py-1 text-center">
                          {data.orderStatus}
                        </div>
                      )}
                      {data.orderStatus === "Ready" && (
                        <div className="rounded-xl bg-[#1054B9] text-center text-white py-1">
                          {data.orderStatus}
                        </div>
                      )}
                      {data.orderStatus === "Cancel" && (
                        <div className="rounded-xl bg-red-500 text-center text-white py-1">
                          {data.orderStatus}
                        </div>
                      )}
                      {data.orderStatus === "Shipped" && (
                        <div className="rounded-xl bg-green-500 text-center text-white py-1">
                          {data.orderStatus}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={allOrders.length}
            paginateBack={paginateBack}
            paginateFront={paginateFront}
            currentPage={currentPage}
          />
        </div>
      </div>
    </CustomerServiceLayout>
  );
};

export default Reports;
