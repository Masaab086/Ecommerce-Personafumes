import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "config/axios";
import { NextPage } from "next";
import { handleAxiosResponseError } from "utils";
import { AiFillEye } from "react-icons/ai";
import CustomerServiceLayout from "layout/customer.service.layout";
import SearchCustomer from "./search.customer/indext";
import Pagination from "components/pagination";
import OrderProductsModal from "./customer.order";

const Customer: NextPage = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleModelShow = () => {
    setShowModal(!showModal);
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
    <CustomerServiceLayout title="Customers" tab={3}>
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
        <OrderProductsModal
          handleModelShow={handleModelShow}
          modal={showModal}
          orderProducts={orderProducts}
          customer={customer}
        />
      </div>
    </CustomerServiceLayout>
  );
};

export default Customer;
