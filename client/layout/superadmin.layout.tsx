import Adminheader from "components/Adminheader";
import Adminsidebar from "components/Adminsidebar";
import Spinner from "components/Spinner";
import { useRouter } from "next/router";
import { FC, ReactElement, useEffect } from "react";
import { useAppSelector } from "store/hooks";

interface SuperAdminLayoutProps {
  tab: Number;
  title: string;
  children: ReactElement;
}

const SuperAdminLayout: FC<SuperAdminLayoutProps> = ({
  title,
  tab,
  children,
}) => {
  const admin = useAppSelector((state) => state.admin.currentAdmin);
  const router = useRouter();

  useEffect(() => {
    if (!admin) router.push("/");
  }, [admin]);

  if (!admin) {
    return (
      <div className="flex h-screen bg-black">
        <div className="m-auto">
          <Spinner className="h-12 w-12 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black h-screen overflow-y-hidden container mx-auto">
      <div className="h-2/12 bg-gray-300">
        <Adminheader admin={admin} />
      </div>
      <div className="flex bg-black h-10/12">
        <div className="w-2/12 ">
          <Adminsidebar tabNo={tab} />
        </div>
        <div className="w-full text-white h-[calc(100vh-64px)] scrollbar-thin scrollbar-thumb-gray-700 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full pb-16">
          <div className="p-2 mx-8 my-2">
            <div className="text-2xl font-semibold ">
              <div>{title}</div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
