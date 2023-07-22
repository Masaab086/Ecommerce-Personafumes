import { UpdateMemberModal } from "model/admin.modal";
import Image from "next/image";
import { FC } from "react";
import { MdEdit } from "react-icons/md";

interface AdminTableProps {
  tabNo: Number;
  allMembers: Array<any>;
  handleMemberClick: (data: UpdateMemberModal) => void;
}

const AdminTable: FC<AdminTableProps> = ({
  tabNo,
  allMembers,
  handleMemberClick,
}) => {
  return (
    <div className={`${tabNo !== 0 && "hidden"}`}>
      <table className="w-full text-sm text-left text-gray-400">
        <thead className="text-xs uppercase bg-gray-700 ">
          <tr>
            <th scope="col" className="py-3 px-6">
              Image
            </th>
            <th scope="col" className="py-3 px-6">
              Name
            </th>
            <th scope="col" className="py-3 px-6">
              Email
            </th>
            <th scope="col" className="py-3 px-6">
              Phone #
            </th>
            <th scope="col" className="py-3 px-6">
              Gender
            </th>
            <th scope="col" className="py-3 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {allMembers.map((admin, index) => {
            if (admin.role === "admin")
              return (
                <tr
                  className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600"
                  key={index}
                >
                  <td className="py-4 px-6 flex">
                    <div className="relative w-10 h-10 rounded-full">
                      <Image
                        className="rounded-full"
                        src="/images/blank.jpg"
                        alt="..."
                        fill
                      />
                    </div>
                  </td>
                  <th className="py-4 px-6">
                    <div className="text-base font-semibold">
                      {admin.firstName + " " + admin.lastName}
                    </div>
                  </th>
                  <td className="py-4 px-6">{admin.userEmail}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">{admin.phone}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">{admin.gender}</div>
                  </td>
                  <td className="py-4 px-6">
                    <MdEdit
                      className="text-white h-6 w-6 cursor-pointer"
                      onClick={() => handleMemberClick(admin)}
                    />
                  </td>
                </tr>
              );
            else <></>;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
