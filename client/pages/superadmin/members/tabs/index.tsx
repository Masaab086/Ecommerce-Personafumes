import { FC } from "react";

interface TabProps {
  tabNo: Number;
  handleTabChange: (num: Number) => void;
}

const Tab: FC<TabProps> = ({ tabNo, handleTabChange }) => {
  return (
    <div className="flex my-2">
      <div
        className={`${
          tabNo === 0 ? "bg-yellow-200" : "bg-white"
        } p-4 text-lg text-center border border-black hover:bg-yellow-300 text-black cursor-pointer w-full`}
        onClick={() => handleTabChange(0)}
      >
        Admins
      </div>
      <div
        className={`${
          tabNo === 1 ? "bg-yellow-200" : "bg-white"
        } p-4 text-lg text-center border border-black hover:bg-yellow-300 text-black cursor-pointer w-full`}
        onClick={() => handleTabChange(1)}
      >
        Customer Service
      </div>
      <div
        className={`${
          tabNo === 2 ? "bg-yellow-200" : "bg-white"
        } p-4 text-lg text-center border border-black hover:bg-yellow-300 text-black cursor-pointer w-full`}
        onClick={() => handleTabChange(2)}
      >
        Supplier
      </div>
    </div>
  );
};

export default Tab;
