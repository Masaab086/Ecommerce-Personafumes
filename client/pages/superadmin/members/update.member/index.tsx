import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Spinner from "components/Spinner";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { toast } from "react-toastify";
import { UpdateMemberModal } from "model/admin.modal";
import { UpdateMemberSchema } from "schemas/member.schema";

interface UpdateMemberProps {
  sideBarDisplay: boolean;
  handleAddSideBar: () => void;
  setAllMembers: Function;
  member: UpdateMemberModal;
}

const UpdateMember: React.FC<UpdateMemberProps> = ({
  sideBarDisplay,
  handleAddSideBar,
  setAllMembers,
  member,
}) => {
  const [btnClick, setBtnClick] = useState<boolean>(false);
  const [defaultData, setDefaultData] = useState<UpdateMemberModal>(member);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UpdateMemberModal>({
    resolver: joiResolver(UpdateMemberSchema, {
      errors: { wrap: { label: "" } },
      abortEarly: false,
    }),
    defaultValues: useMemo(() => {
      return defaultData;
    }, [defaultData]),
  });

  useEffect(() => {
    setDefaultData(member);
  }, [member]);

  useEffect(() => {
    reset(defaultData);
  }, [member, defaultData, reset]);

  const handleUpdateMember = (data: any) => {
    console.log(data);
    setBtnClick(true);
    axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/superadmin/member`, data)
      .then(({ data }) => {
        console.log(data);
        setAllMembers((all: any) =>
          all.map((admin: any) =>
            admin.adminId === member.adminId
              ? { ...member, ...data.member }
              : admin
          )
        );
        setDefaultData(data.member);
        setBtnClick(false);
        toast.success(data.message);
        reset();
      })
      .catch((err) => {
        setBtnClick(false);
        console.log(handleAxiosResponseError(err));
        toast.error(handleAxiosResponseError(err));
      });
  };

  return (
    <>
      <div
        className={`h-screen overflow-y-auto absolute top-0 right-0 w-3/6 text-white ease-in-out duration-300 bg-[#14181B]  ${
          sideBarDisplay == true ? "translate-x-0" : "translate-x-full hidden"
        } `}
      >
        <div className="h-[64px] p-1 px-3 flex justify-between items-center">
          <div>
            <div>Update Member</div>
            <div>Update Member and necessary information from here</div>
          </div>

          <div className="cursor-pointer" onClick={handleAddSideBar}>
            X
          </div>
        </div>

        {/* Inputs section */}
        <form onSubmit={handleSubmit(handleUpdateMember)}>
          <div className="bg-[#24262D] px-6 py-8">
            {/* INput 1 */}

            {/* INput 3 */}
            <div className="grid grid-cols-3 my-5">
              <div>First Name</div>
              <div className="col-span-2">
                <input
                  type="text"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="John"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Last Name</div>
              <div className="col-span-2">
                <input
                  type="text"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="Dev"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Email</div>
              <div className="col-span-2">
                <input
                  type="email"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="Email"
                  {...register("userEmail")}
                />
                {errors.userEmail && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.userEmail.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Phone #</div>
              <div className="col-span-2">
                <input
                  type="text"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="Phone"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Gender</div>
              <div className="col-span-2">
                <div id="gender" className="flex items-center">
                  <div className="mr-2 flex items-center">
                    <label htmlFor="true" className={`mr-1 `}>
                      Men
                    </label>
                    <input
                      type="radio"
                      value={"male"}
                      {...register("gender")}
                    />
                  </div>
                  <div className="ml-2 flex items-center">
                    <label htmlFor="false" className="mr-1">
                      Women
                    </label>
                    <input
                      type="radio"
                      value={"female"}
                      {...register("gender")}
                    />
                  </div>
                </div>
                {errors.gender && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Role</div>
              <div className="col-span-2">
                <select
                  id="day"
                  className="w-full bg-transparent  border border-[#626366] rounded p-2"
                  {...register("role")}
                >
                  <option value="" className="bg-black">
                    Role
                  </option>
                  <option value="admin" className="bg-black">
                    Admin
                  </option>
                  <option value="customerservice" className="bg-black">
                    Customer Service
                  </option>
                  <option value="supplier" className="bg-black">
                    Supplier
                  </option>
                </select>
                {errors.role && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>

            {/* End of the input 5 */}
          </div>

          {/* End buttons section */}
          <div className="flex justify-around py-6 px-4">
            <button
              type="reset"
              className="bg-[#24262D] w-5/12 py-1 rounded-md"
              onClick={handleAddSideBar}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#DBC864] text-black rounded-md w-5/12 py-1"
            >
              {btnClick ? (
                <Spinner className="mx-auto h-8 w-8 text-gray-800" />
              ) : (
                "Update Member"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateMember;
