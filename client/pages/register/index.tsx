import React from "react";
import type { NextPage } from "next";
import Header from "components/Header";
import HeroImage from "components/HeroImage";
import Registerform from "components/Register";
import Footer from "components/Footer";

interface RegisterProps {
  products: Array<any>;
  isLightTheme: boolean;
}

const Register: NextPage<RegisterProps> = ({ products, isLightTheme }) => {
  return (
    <div
      className={`${
        isLightTheme ? "bg-white text-black" : "bg-black text-white"
      } h-full min-h-screen flex flex-col font-Raleway container mx-auto`}
    >
      <Header products={products} isLightTheme={isLightTheme} />

      <div className={"flex h-full w-full pt-6 mb-4"}>
        <HeroImage />

        <Registerform isLightTheme={isLightTheme} />
      </div>

      <Footer isLightTheme={isLightTheme} />
    </div>
  );
};

export default Register;
