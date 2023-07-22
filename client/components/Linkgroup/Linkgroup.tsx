import Link from "next/link";
import React from "react";

interface LinkGroupProps {
  data: {
    title: string;
    links: Array<object>;
  };
  isLightTheme: boolean;
}

const Linkgroup: React.FC<LinkGroupProps> = ({ data, isLightTheme }) => {
  return (
    <div className={`${isLightTheme ? "text-black" : "text-white"} w-4/5`}>
      <p className="font-bold text-xl lg:text-2xl my-5">{data.title}</p>

      {data.links.map((link: any, key: any) => {
        return (
          <div className="my-5" key={key}>
            <Link
              href={link.path}
              key={key}
              className={`${isLightTheme ? "text-black" : "text-white"}`}
            >
              {link.text}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Linkgroup;
