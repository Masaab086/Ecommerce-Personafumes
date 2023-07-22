// import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { GetServerSideProps, NextPage } from "next";
import LandingPage from "./home";

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: { landingPage: any };
}> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/page`);
  const { landingPage } = await res.json();

  return {
    props: {
      landingPage,
    },
  };
};
interface Props {
  products: Array<any>;
  // latestArrivals: Array<any>;
  landingPage: any;
  isLightTheme: boolean;
}
const Home: NextPage<Props> = ({
  // latestArrivals,
  products,
  landingPage,
  isLightTheme,
}) => {
  return (
    <LandingPage
      products={products}
      // latestArrivals={latestArrivals}
      landingPage={landingPage}
      isLightTheme={isLightTheme}
    />
  );
};

export default Home;
