import React from "react";
// import { toast } from "react-toastify";
import Footer from "../../components/Footer";
import Footerlinks from "../../components/Footerlinks";
import Header from "../../components/Header";
import Servicecards from "../../components/Servicecards";
import Hero from "./hero";
// import Feature from "./feature";
// import Products from "./products";
// import About from "./about";
import Award from "./award";
import { Bottle } from "model/interfaces";

interface LandingPageProps {
  products: Array<Bottle>;
  landingPage: any;
  isLightTheme: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({
  products,
  landingPage,
  isLightTheme,
}) => {
  return (
    <div
      className={`${
        isLightTheme ? "bg-[#FBEDEB]" : "bg-black"
      }  w-full h-full container mx-auto`}
    >
      <Header products={products} isLightTheme={isLightTheme} />

      <div className="overflow-x-hidden">
        <Hero hero={landingPage.hero} isLightTheme={isLightTheme} />

        {/* Second Section */}
        {/* <Feature feature={landingPage?.feature} /> */}

        {/* 3rd Section */}
        {/* <Products latest={latestArrivals} allProducts={products} /> */}

        {/* Section 4 */}
        {/* <About about={landingPage?.about} /> */}

        {/* Section 4 */}
        <Award award={landingPage?.award} isLightTheme={isLightTheme} />

        {/* Section 5 */}

        <Servicecards isLightTheme={isLightTheme} />

        <Footerlinks isLightTheme={isLightTheme} />

        <Footer isLightTheme={isLightTheme} />
      </div>
    </div>
  );
};

export default LandingPage;
