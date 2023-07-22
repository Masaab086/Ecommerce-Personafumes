import type { NextPage } from "next";
import React from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import HeroImage from "../components/HeroImage";
import LoginForm from "../components/LoginForm";

interface LoginProps {
  products: Array<any>;
  isLightTheme: boolean;
}

const Login: NextPage<LoginProps> = ({ products, isLightTheme }) => {
  return (
    <div
      className={`${
        isLightTheme ? "bg-white text-black" : "bg-black text-white"
      } h-full min-h-screen flex flex-col font-Raleway mx-auto container`}
    >
      <Header products={products} isLightTheme={isLightTheme} />

      <div className="flex h-max justify-center lg:justify-none">
        <HeroImage />
        <LoginForm isLightTheme={isLightTheme} />
      </div>

      <Footer isLightTheme={isLightTheme} />
    </div>
  );
};

export default Login;
