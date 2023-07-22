import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "config/axios";
import { NextPage } from "next";
import { handleAxiosResponseError } from "utils";
import { AiFillEdit, AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import SuperAdminLayout from "layout/superadmin.layout";
import SearchCustomer from "./search.customer/indext";
import Pagination from "components/pagination";
import UpdateCustomer from "./update.customer";
import { toast } from "react-toastify";
import OrderProductsModal from "./customer.order";

const Customer: NextPage = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sideBarDisplay, setSideBarDisplay] = useState(false);
  const [customer, setCustomer] = useState({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [orderProducts, setOrderProducts] = useState<Array<any>>([]);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/customer`)
      .then(({ data }) => {
        console.log(data);
        setAllCustomers(data.customers);
        setCustomers(data.customers);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
      });
  }, []);

  const handleDelete = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const value = e.target.checked;
    console.log("value : ", value);
    axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/customer/block/${id}`,
        { isBlocked: value }
      )
      .then(({ data }) => {
        console.log(data);
        setCustomers((cust: any) =>
          cust.map((item: any) =>
            item.customerId === id ? { ...item, isBlocked: value } : item
          )
        );
        toast.success(data.message);
      })
      .catch((err) => {
        toast.error(handleAxiosResponseError(err));
        console.log(handleAxiosResponseError(err));
      });
  };

  const handleModelShow = () => {
    setShowModal(!showModal);
  };

  const handleUpdate = (data: any) => {
    setSideBarDisplay(true);
    // console.log(data);
    setCustomer(data);
  };

  const handleCustomerOrder = (id: string, data: any) => {
    setCustomer(data);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/customer/orders/${id}`
      )
      .then(({ data }) => {
        console.log(data);
        setOrderProducts(data.orders);
        setShowModal(true);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
      });
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = customers.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <SuperAdminLayout title="Customers" tab={3}>
      <div>
        <div className="w-full bg-[#222328] px-4 py-4 my-4 rounded">
          <SearchCustomer
            setCustomers={setCustomers}
            allCustomers={allCustomers}
          />
        </div>

        <div>
          <table className="overflow-x-auto table w-full border-separate border-spacing-y-2	">
            <thead>
              <tr className="table w-full bg-[#222328] rounded-md">
                <td className="py-3 px-4 w-[15%]">ID</td>
                <td className="py-3 px-4 w-[15%]">JOINING DATE</td>
                <td className="py-3 px-4 w-[15%]">NAME</td>
                <td className="py-3 px-4 w-[25%]">EMAIL</td>
                <td className="py-3 px-4 w-[20%]">PHONE</td>
                <td className="py-3 px-4 w-[10%]">ORDERS</td>
                <td className="py-3 px-4 w-[10%]">ACTIONS</td>
              </tr>
            </thead>
            <tbody className="block w-full">
              {currentPosts.map((data: any, index) => {
                return (
                  <tr
                    className="table w-full py-1 my-3 bg-[#222328] border-separate border-spacing-1.5 rounded-md"
                    key={index}
                  >
                    <td className="px-4 w-[15%]">{data.customerId}</td>
                    <td className="px-4 w-[15%]">
                      {data.joiningDate.split("T")[0]}
                    </td>
                    <td className="px-4 w-[15%]">
                      {data.firstName} {data.lastName}
                    </td>
                    <td className="px-4 w-[25%]">{data.userEmail}</td>
                    <td className="px-4 w-[20%]">{data.phone}</td>
                    <td className="px-4 w-[10%]">
                      <AiFillEye
                        className="h-8 w-8 rounded-full cursor-pointer hover:bg-slate-700"
                        onClick={() =>
                          handleCustomerOrder(data.customerId, data)
                        }
                      />
                    </td>
                    <td className="px-4 w-[10%]">
                      <div className="flex justify-between">
                        <label
                          htmlFor={"default-toggle" + index}
                          className="inline-flex relative items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={data.isBlocked}
                            id={"default-toggle" + index}
                            className="sr-only peer"
                            onChange={(e) => handleDelete(e, data.customerId)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-transparent after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:border-red-300 after:border after:mt-1 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                        </label>

                        <MdModeEdit
                          className="h-8 w-8 hover:bg-slate-700 rounded-full p-1 cursor-pointer"
                          onClick={() => handleUpdate(data)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={customers.length}
            paginateBack={paginateBack}
            paginateFront={paginateFront}
            currentPage={currentPage}
          />
        </div>
        <UpdateCustomer
          sideBarDisplay={sideBarDisplay}
          setSideBarDisplay={setSideBarDisplay}
          customer={customer}
          setAllCustomers={setAllCustomers}
          setCustomers={setCustomers}
        />
        <OrderProductsModal
          handleModelShow={handleModelShow}
          modal={showModal}
          orderProducts={orderProducts}
          customer={customer}
        />
      </div>
    </SuperAdminLayout>
  );
};

export default Customer;
