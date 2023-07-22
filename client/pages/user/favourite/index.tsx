import Header from "components/Header";
import Spinner from "components/Spinner";
import UserSidebar from "components/user.sidebar";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppSelector } from "store/hooks";
import { handleAxiosResponseError } from "utils";
import axios from "config/axios";
import Link from "next/link";
import Card from "components/Card";

interface FavouriteProps {
  products: Array<any>;
  isLightTheme: boolean;
}

const Favourite: NextPage<FavouriteProps> = ({ products, isLightTheme }) => {
  const auth = useAppSelector((state) => state.auth.jwt);
  const user = useAppSelector((state) => state.user.currentUser);
  const router = useRouter();
  const [favourites, setFavourites] = useState([]);

  if (!auth || auth === "logged_out") router.push("/");

  useEffect(() => {
    if (!auth || auth === "logged_out") router.push("/");
  }, [auth, router]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/customer/products/favourite`
      )
      .then(({ data }) => {
        setFavourites(data.products);
        console.log(data);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
      });
  }, []);

  if (!auth || auth === "logged_out") {
    return (
      <div className="flex h-screen bg-black">
        <div className="m-auto">
          <Spinner className="h-12 w-12 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        isLightTheme ? "bg-white text-black" : "bg-black text-white"
      } font-Raleway h-screen container mx-auto`}
    >
      <Header products={products} isLightTheme={isLightTheme} />

      <div className="flex">
        <div className={`w-96 mx-auto ${isLightTheme ? "bg-[#FDF3EB]" : ""}`}>
          <div className="w-full">
            <h1 className="text-2xl my-5">My account</h1>

            <h3 className="my-5 text-xl">
              Welcome {user?.firstName}, {user?.lastName}{" "}
            </h3>

            {/* Navitems */}
            <UserSidebar active={2} isLightTheme={isLightTheme} />
            {/* End of Navitems */}
          </div>
        </div>

        {/* Right side component */}
        <div className="w-full mx-5">
          <div className="my-5">
            <h1 className="text-2xl text-gray-400">Favourite</h1>
          </div>

          {/* Cards Section */}

          <div className="w-full my-5 overflow-y-auto h-[calc(100vh-208px)]">
            <div className="grid md:grid-cols-2 lg:grid-cols-4">
              {favourites?.map((card: any, key: number) => {
                return (
                  <Link href={`/product/${card.productId}`} key={key}>
                    <Card card={card} key={key} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* End of cards section */}
        </div>
      </div>
    </div>
  );
};

export default Favourite;
