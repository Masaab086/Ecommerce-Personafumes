import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { GiHelp } from "react-icons/gi";

interface HeaderProps {
  isLightTheme: boolean;
}

const Header: FC<HeaderProps> = ({ isLightTheme }) => {
  const [showToggle, setShowToggle] = useState(false);
  const handleHelpToggle = () => {
    setShowToggle(!showToggle);
  };
  return (
    <div
      className={` h-16 flex justify-between border-b border-[#616162] ${
        isLightTheme ? "bg-[#FFEDDF]" : "bg-black"
      }`}
    >
      <div className="flex md:px-5 items-center">
        <div className="flex relative h-8 w-48 md:h-10 md:w-60 px-10 ">
          <Link href="/">
            <Image
              src={"/images/personalogo.png"}
              fill
              alt="header logo"
              sizes="100vw"
            />
          </Link>
        </div>
      </div>

      {/* Phone and number section navbar */}
      <div className="flex justify-center">
        <div
          className="flex items-center justify-center md:hidden relative"
          onClick={handleHelpToggle}
        >
          <GiHelp className="text-white cursor-pointer h-8 w-8" />
        </div>

        <div
          className={`${
            showToggle
              ? "w-max top-14 h-auto p-2 right-0 z-10 bg-gray-500 absolute rounded"
              : "hidden"
          }  md:flex justify-center`}
        >
          <div className="flex px-2 self-center">
            <div className="w-fit p-2">
              <Image
                src="/icons/phone.png"
                width="25"
                height="25"
                alt="phone"
              />
            </div>
            <div>
              <div>TALK TO A REAL PERSON</div>
              <div>855-563-7465</div>
            </div>
          </div>
          <div className="flex px-2 self-center">
            <div className="w-fit p-2">
              <Image src="/icons/chat.png" width="25" height="25" alt="chat" />
            </div>
            <div>
              <div>TALK TO A REAL PERSON</div>
              <div>855-563-7465</div>
            </div>
          </div>
        </div>
      </div>
      {/*End of Phone and number section navbar */}
    </div>
  );
};

export default Header;
