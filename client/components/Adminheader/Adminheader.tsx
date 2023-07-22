import React, { FC } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Image from "next/image";
import Link from "next/link";

interface AdminheaderProps {
  admin: any;
}

const Adminheader: FC<AdminheaderProps> = ({ admin }) => {
  return (
    <div className="text-white bg-black p-5 flex justify-between items-center h-[64px] bg-[#23252A]">
      <div className="mx-5 flex items-center">
        <Link href={"/"}>
          <div className="relative h-10 w-60 mx-1">
            {/* <IconPersona/> */}
            <Image
              src="/images/personalogo.png"
              className="w-40 h-8"
              alt="personafumes"
              fill
              sizes="100vw"
            />
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-5 px-3 mx-5 	">
        <div>
          <NotificationsIcon style={{ color: "yellow" }} fontSize="large" />
        </div>
        <div>
          <div className="relative w-10 h-10 rounded-full border border-white overflow-hidden">
            <Image
              src={admin?.profile ? admin.profile : "/images/blank.jpg"}
              alt="user"
              fill
              className="w-10 h-10"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminheader;
