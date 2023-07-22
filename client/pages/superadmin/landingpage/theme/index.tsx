import { ChangeEvent, FC, useState } from "react";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { toast } from "react-toastify";

interface ThemeProps {
  theme: boolean;
}

const Theme: FC<ThemeProps> = ({ theme }) => {
  const [toggle, setToggle] = useState(theme);

  const handleToggle = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (target) {
      axios
        .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/page/theme`, {
          lightTheme: !toggle,
        })
        .then(({ data }) => {
          console.log(data);
          setToggle(!toggle);
          toast.success(data.message);
        })
        .catch((err) => {
          toast.error(handleAxiosResponseError(err));
          console.log(handleAxiosResponseError(err));
        });
    }
  };

  return (
    <div className="py-5 border-b">
      <div>
        <h1 className="text-xl font-bold">System Theme</h1>
      </div>
      <div className="flex my-6">
        <div className="ml-3 text-sm font-medium text-white mr-10">
          Light Theme :{" "}
        </div>
        <label className="inline-flex relative items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            onChange={handleToggle}
            className="sr-only peer"
            checked={toggle}
          />
          <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-yellow-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-400"></div>
        </label>
      </div>
    </div>
  );
};

export default Theme;
