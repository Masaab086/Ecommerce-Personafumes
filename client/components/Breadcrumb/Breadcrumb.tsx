import React from "react";
import Link from "next/link";

interface BreadCrumb {
  siteTitle: string;
  path1: string;
  path2?: string;
  link1: string;
  link2: string;
  isLightTheme: boolean;
}

const Breadcrumb: React.FC<BreadCrumb> = ({
  siteTitle,
  path1,
  link1,
  link2,
  path2,
  isLightTheme,
}) => {
  return (
    <div
      className={`p-5 text-center ${
        isLightTheme ? "bg-[#FDF3EB] text-black" : "bg-[#383838] text-white"
      }`}
    >
      <p className="text-3xl">{siteTitle}</p>
      {/* <div className="my-5">
        <Link href={path1}>{link1} / </Link>

        <Link href={"/"}>{link2}</Link>
      </div> */}
    </div>
  );
};

export default Breadcrumb;
