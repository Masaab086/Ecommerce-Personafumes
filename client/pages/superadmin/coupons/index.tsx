import React, { useEffect, useState } from "react";
import Adminheader from "../../../components/Adminheader";
import Adminsidebar from "../../../components/Adminsidebar";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { NextPage } from "next";
import axios from "config/axios";
import AddCoupon from "./add.coupon";
import { handleAxiosResponseError } from "utils";
import UpdateCoupon from "./update.coupon";
import { RiMailSendFill } from "react-icons/ri";
import { toast } from "react-toastify";
import SuperAdminLayout from "layout/superadmin.layout";

const Coupon: NextPage = () => {
  const [sideBarDisplay, setSideBarDisplay] = useState(false);
  const [sideBarUpdate, setSideBarUpdate] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [coupon, setCoupon] = useState<any>({});

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/coupon`)
      .then(({ data }) => {
        console.log(data);
        setCoupons(data.coupons);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
      });
  }, []);

  const handleUpdate = (data: any) => {
    setSideBarUpdate(true);
    setCoupon({
      ...data,
      startDate: data.startDate.split("T")[0],
      endDate: data.endDate.split("T")[0],
    });
  };

  const handleCouponsDelete = (id: string) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/coupon/${id}`)
      .then(({ data }) => {
        setCoupons(coupons.filter((item: any) => item.couponId !== id));
        toast.success(data.message);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
        toast.error(handleAxiosResponseError(err));
      });
  };

  const handlePromotions = (id: string) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/coupon/promotion/${id}`
      )
      .then(({ data }) => {
        toast.success(data.message);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
        toast.error(handleAxiosResponseError(err));
      });
  };

  return (
    <SuperAdminLayout title="Coupons" tab={5}>
      <div>
        <div className=" bg-[#222328] px-4 py-4 my-4 rounded flex ">
          <input
            type="text"
            placeholder="Search by name/email/phone"
            className="border rounded border-[#938E8E] bg-transparent  w-10/12 py-1 px-3"
          />
          <button
            onClick={() => setSideBarDisplay(true)}
            className="w-2/12 mx-2 text-black px-4 py-2 bg-[#DBC864] rounded-md"
          >
            + Add Coupons
          </button>
        </div>

        {/* Table section */}

        <div className=" bg-[#222328] flex justify-center">
          <table className="w-full m-1  border-separate border-spacing-y-3	">
            <thead className="w-full">
              <tr className="w-full bg-[#222328] p-8 border border-[#9E9E9E] rounded-md">
                <td className="px-3 py-2">START DATE</td>
                <td className="px-3 py-2">END DATE</td>
                <td className="px-3 py-2">CAMPAIGNS NAME</td>
                <td className="px-3 py-2">CODE</td>
                <td className="px-3 py-2">PERCENTAGE</td>
                {/* <td className="px-3 py-2">PRODUCT TYPE</td> */}
                <td className="px-3 py-2">STATUS</td>
                <td className="px-3 py-2">ACTION</td>
                <td className="px-3 py-2">PROMOTIONS</td>
              </tr>
            </thead>

            <tbody>
              {coupons.map((data: any, key) => {
                return (
                  <tr
                    className="text-sm text-[#9E9E9E] my-3 bg-[#222328] border rounded-md "
                    key={key}
                  >
                    <td className="py-2 px-3">
                      {data.startDate.split("T")[0]}
                    </td>
                    <td className="py-2 px-3">{data.endDate.split("T")[0]}</td>
                    <td className="py-2 px-3">{data.campaignName}</td>
                    <td className="py-2 px-3">{data.code}</td>
                    <td className="py-2 px-3">{data.discount}%</td>
                    {/* <td className="py-2 px-2">Grocery</td> */}

                    <td className="py-1 px-3">
                      {data.status === "active" ? (
                        <div className="rounded-xl bg-green-600 text-white text-center">
                          Active
                        </div>
                      ) : (
                        <></>
                      )}
                      {data.status === "inactive" ? (
                        <div className="rounded-xl bg-yellow-600 text-white text-center">
                          InActive
                        </div>
                      ) : (
                        <></>
                      )}
                      {data.status === "expire" ? (
                        <div className="rounded-xl bg-red-600 text-white text-center">
                          Expire
                        </div>
                      ) : (
                        <></>
                      )}
                    </td>

                    <td className="py-1 px-3">
                      <div className="flex">
                        <AiFillDelete
                          className="h-8 w-8 hover:bg-slate-700 rounded-full p-1 cursor-pointer"
                          onClick={() => handleCouponsDelete(data.couponId)}
                        />
                        <MdModeEdit
                          className="h-8 w-8 hover:bg-slate-700 rounded-full p-1 cursor-pointer"
                          onClick={() => handleUpdate(data)}
                        />
                      </div>
                    </td>
                    <td className="py-1 px-3 flex justify-around">
                      <div
                        className="hover:bg-slate-500 h-8 w-8 rounded cursor-pointer"
                        onClick={() => handlePromotions(data.couponId)}
                      >
                        <RiMailSendFill className="h-8 w-8 p-1" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <AddCoupon
          sideBarDisplay={sideBarDisplay}
          setSideBarDisplay={setSideBarDisplay}
          setCoupons={setCoupons}
        />

        <UpdateCoupon
          sideBarUpdate={sideBarUpdate}
          setSideBarUpdate={setSideBarUpdate}
          setCoupons={setCoupons}
          coupon={coupon}
          coupons={coupons}
        />
      </div>
    </SuperAdminLayout>
  );
};

export default Coupon;
