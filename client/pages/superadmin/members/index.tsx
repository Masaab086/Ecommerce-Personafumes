import SuperAdminLayout from "layout/superadmin.layout";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import AddMember from "./add.member";
import AdminTable from "./admins.table";
import CustomerServiceTable from "./customer.service.table";
import SupplierTable from "./supplier.table";
import Tab from "./tabs";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import UpdateMember from "./update.member";
import { UpdateMemberModal } from "model/admin.modal";

const Members: NextPage = () => {
  const [tabNo, setTabNo] = useState<Number>(0);
  const [sideBarDisplay, setSideBarDisplay] = useState<boolean>(false);
  const [sideBarUpdateDisplay, setSideBarUpdateDisplay] =
    useState<boolean>(false);
  const [allMembers, setAllMembers] = useState<Array<any>>([]);
  const [member, setMember] = useState<UpdateMemberModal>({
    adminId: "",
    firstName: "",
    lastName: "",
    userEmail: "",
    role: "",
    gender: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/superadmin/member`)
      .then(({ data }) => {
        setAllMembers(data.members);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
      });
  }, []);

  const handleTabChange = (num: Number) => {
    setTabNo(num);
  };

  const handleAddSideBar = () => {
    setSideBarDisplay(!sideBarDisplay);
  };

  const handleUpdateSideBar = () => {
    setSideBarUpdateDisplay(!sideBarUpdateDisplay);
  };

  const handleMemberClick = (data: UpdateMemberModal) => {
    const { adminId, userEmail, role, phone, gender, firstName, lastName } =
      data;
    setMember({ adminId, userEmail, role, phone, gender, firstName, lastName });
    setSideBarUpdateDisplay(true);
  };

  return (
    <SuperAdminLayout title="Members" tab={8}>
      <div>
        <Tab tabNo={tabNo} handleTabChange={handleTabChange} />

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg my-4">
          <div className="flex justify-between items-center pb-4 mt-2 bg-gray-900">
            <label className="sr-only">Search</label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block p-2 pl-10 w-80 text-sm rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 placeholder-gray-400 text-white "
                placeholder="Search for users"
              />
            </div>
            <button
              className="px-4 py-2 bg-yellow-300 rounded text-black hover:bg-yellow-400"
              onClick={handleAddSideBar}
            >
              Add New Member
            </button>
          </div>
          <AdminTable
            tabNo={tabNo}
            allMembers={allMembers}
            handleMemberClick={handleMemberClick}
          />
          <CustomerServiceTable
            tabNo={tabNo}
            allMembers={allMembers}
            handleMemberClick={handleMemberClick}
          />
          <SupplierTable
            tabNo={tabNo}
            allMembers={allMembers}
            handleMemberClick={handleMemberClick}
          />
        </div>
        <AddMember
          handleAddSideBar={handleAddSideBar}
          sideBarDisplay={sideBarDisplay}
          setAllMembers={setAllMembers}
        />

        <UpdateMember
          handleAddSideBar={handleUpdateSideBar}
          sideBarDisplay={sideBarUpdateDisplay}
          setAllMembers={setAllMembers}
          member={member}
        />
      </div>
    </SuperAdminLayout>
  );
};

export default Members;
