import React, { ChangeEvent, FC, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DehazeIcon from "@mui/icons-material/Dehaze";
import Image from "next/image";
import Link from "next/link";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { MdDeleteOutline } from "react-icons/md";
import { Bag, bagActions } from "store/slices/bag.slice";
import { CurrentUser } from "store/slices/user.slice";
import { CurrentAdmin } from "store/slices/admin.slice";
import { Bottle } from "model/interfaces";

interface HeaderProps {
  products: Array<Bottle>;
  isLightTheme: boolean;
}

const Header: FC<HeaderProps> = ({ products, isLightTheme }) => {
  const [searchDisplay, setSearchDisplay] = useState(false);
  const [navbarDisplay, setNavbarDisplay] = useState("");
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState<Array<any>>([]);
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const user = useAppSelector((state): CurrentUser => state.user.currentUser);
  const admin = useAppSelector(
    (state): CurrentAdmin => state.admin.currentAdmin
  );
  const bag = useAppSelector((state): Bag[] => state.bag.currentBag);
  const dispatch = useAppDispatch();
  const [cost, setCost] = useState<number>(0);
  const router = useRouter();

  const [filter, setFilter] = useState<Array<any>>([]);

  useEffect(() => {
    setProduct(products);
  }, [products]);

  useEffect(() => {
    let price: number = 0;
    bag.forEach((item) => {
      price = price + item?.fragranceCost;
    });
    setCost(price);
  }, [bag]);

  useEffect(() => {
    if (user) setUserName(user?.firstName + " " + user?.lastName);
    else if (admin) setUserName(admin?.firstName + " " + admin?.lastName);
    else setUserName("");
  }, [user, admin]);

  const displaySearch = () => {
    setSearchDisplay(true);
    setNavbarDisplay("");
  };

  const closeSearch = () => {
    setSearchDisplay(false);
    setNavbarDisplay("");
  };

  const selectSearch = (data: string, type: string) => {
    router.push(`/product/${data}?type=${type.toLocaleLowerCase()}`);
  };

  const handelSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const newFilter = product.filter((value) => {
      return value.bottleName
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase());
    });

    setFilter(newFilter);
  };

  const clearSearch = () => {
    setSearch("");
    setFilter([]);
  };

  const handleLoginClick = () => {
    if (user) router.push("/user/account");
    else if (admin) {
      if (admin.role === "superadmin") router.push("/superadmin/reports");
      else if (admin.role === "admin") router.push("/admin/reports");
      else if (admin.role === "customerservice")
        router.push("/customerservice/reports");
      else if (admin.role === "supplier") router.push("/supplier/order");
    } else router.push("/login");
  };

  const handelDeleteCard = (variantId: string | undefined): void => {
    if (variantId) dispatch(bagActions.removeBag({ variantId }));
  };

  const handleProceed = () => {
    router.push("/bag");
  };

  return (
    <>
      <div
        className={`w-full text-white z-40  bg-[#2A2D30FA] opacity-90 p-8 fixed top-0 ease-in-out duration-300 ${
          searchDisplay == true ? "translate-y-0" : "translate-y-[-800px]"
        }`}>
        <div className="text-right">
          <span className=" cursor-pointer w-fit" onClick={closeSearch}>
            X
          </span>
        </div>
        <div
          className="flex w-5/6 mx-auto border-b-2 py-3 border-white justify-center items-center"
          // onSubmit={handleSubmit}
        >
          {search.length == 0 ? (
            <button className="mx-3" type="submit">
              <Image
                src="/icons/search.png"
                height="21"
                width="21"
                alt="Search"
                className={"mt-1"}
              />
            </button>
          ) : (
            <span className="cursor-pointer mx-3" onClick={clearSearch}>
              X
            </span>
          )}
          <input
            type="text"
            className="w-full rounded-0 border-0 bg-transparent focus:outline-none text-white mx-3 "
            placeholder="Search"
            value={search}
            onChange={handelSearchChange}
          />
          <select name="" id="" className="bg-transparent focus:outline-none ">
            <option
              value="1"
              className="bg-transparent focus:outline-none hove:outline-none">
              in: Emporio Armani
            </option>
          </select>
        </div>
        <div className="w-5/6 mx-auto my-5">
          <div className="text-[#FFFCFC] text-sm">TRENDING SEARCHES</div>
          <div className="text-white">
            {filter.slice(0, 4).map((data: any, key) => {
              return (
                <div
                  key={key}
                  className="my-3 cursor-pointer text-md"
                  onClick={() =>
                    selectSearch(data.bottleId, data.categoryType)
                  }>
                  {data.bottleName}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={
          `w-full flex justify-between h-16 p-4 pl-0 md:pl-4 ${
            isLightTheme ? "bg-[#FFEDDF] text-black" : "bg-black text-white"
          }  sticky z-10 Raleway ` + navbarDisplay
        }>
        {/* Nav links section */}
        <div className="hidden lg:block pt-2">
          <ul className="hidden lg:flex">
            <li className="mx-4">
              <Link href="/">HOME</Link>
            </li>

            {/* <li className="mx-4">
              <Link href="/product?category=men">MEN FRAGRANCE</Link>
            </li>
            <li className="mx-4">
              <Link href="/product?category=women">WOMEN FRAGRANCE</Link>
            </li> */}

            <li className="mx-4">
              <Link href="/product/1673075255724?type=both">
                PERSONALIZE YOUR PERFUME
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo Section */}

        <div className="flex w-auto">
          <Link
            href="/"
            className="relative ml-14 w-60 h-8 md:h-12 pt-10 md:pt-0 md:w-72">
            <Image
              src={"/images/personalogo.png"}
              fill
              priority
              alt="header logo"
            />
          </Link>
        </div>

        <div className="justify-end hidden lg:flex w-[404px]">
          {/* <IconButton
            sx={{ color: isLightTheme ? "#865D4C" : "#fff" }}
            onClick={displaySearch}
          >
            <SearchIcon className={"text-3xl mt-2"} />
          </IconButton> */}

          <div className="group inline-block relative">
            <IconButton
              sx={{ color: isLightTheme ? "#865D4C" : "#fff" }}
              onClick={() => router.push("/bag")}>
              <ShoppingCartIcon className={"text-3xl"} />
            </IconButton>
            <div className="absolute hidden right-0 rounded bg-[#2A2D30] text-gray-400 p-6 group-hover:block w-80 h-96 overflow-y-auto">
              {bag.length ? (
                <div className="">
                  <p className="text-sm text-center">
                    You have a {bag.length} item in your Shopping Bag
                  </p>

                  {bag.map((item, index) => (
                    <div className="py-4 border-b border-gray-400" key={index}>
                      <div className="flex">
                        <div className="relative w-20 h-20">
                          <Image src={item.image} fill alt="bottle" />
                        </div>
                        <div className="pl-4">
                          <h1 className="text-yellow-400">
                            {item.inspiration}
                          </h1>
                          {/* <div className="text-yellow-400">Rs 32</div> */}
                          <div className="text-sm">
                            <div>Fragrance Cost : Rs {item.fragranceCost}</div>
                            <div>Size : {item.weight} ml</div>
                            <div>Quantity : {item.quantity}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center py-2">
                        <MdDeleteOutline
                          className="h-8 w-8"
                          onClick={() => handelDeleteCard(item.variantId)}
                        />
                        Remove
                      </div>
                    </div>
                  ))}
                  <div className="text-yellow-400 flex justify-between py-2">
                    <span>SubTotal</span>
                    <span>Rs. {cost}</span>
                  </div>

                  <button
                    className="w-full text-gray-300 bg-black rounded py-1 font-semibold mt-4"
                    onClick={handleProceed}>
                    Proceed to Purchase
                  </button>
                </div>
              ) : (
                <div className="flex justify-center items-center h-full w-full">
                  Nothing in Cart
                </div>
              )}
            </div>
          </div>
          <div className="group">
            {userName ? (
              <div className="text-base pt-2 hover:underline cursor-pointer">
                {userName}
              </div>
            ) : (
              <IconButton
                sx={{ color: isLightTheme ? "#865D4C" : "#fff" }}
                onClick={handleLoginClick}>
                <PersonOutlineOutlinedIcon className={"text-3xl"} />
              </IconButton>
            )}
            {userName && (
              <div className="absolute hidden right-0 rounded bg-[#2A2D30] text-gray-400 p-4 group-hover:block w-40 h-auto">
                <div className="flex flex-col">
                  <div
                    className="hover:underline cursor-pointer"
                    onClick={handleLoginClick}>
                    Profile
                  </div>
                  <Link href={"/signout"}>Sign out</Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:hidden relative">
          <div>
            <IconButton
              color="inherit"
              onClick={(): void => setdropdownOpen(!dropdownOpen)}
              className="pt-0">
              <DehazeIcon className={"text-7xl md:text-2xl"} />
            </IconButton>
          </div>
          <div
            className={`${
              dropdownOpen
                ? `top-full opacity-100 visible`
                : "top-[110%] invisible opacity-0"
            } absolute z-40 right-0 w-64 rounded border-0 shadow-card transition-all`}>
            <ul className="flex flex-col p-4 rounded-lg border bg-gray-800 border-gray-700">
              <li>
                <Link
                  href="/"
                  className="block text-xl py-4 pr-4 pl-3 rounded text-gray-400 hover:bg-gray-700 hover:text-white">
                  HOME
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/product"
                  className="block text-xl py-4 pr-4 pl-3 rounded hover:bg-gray-100 text-gray-400 hover:bg-gray-700 hover:text-white "
                >
                  MEN PERFUME
                </Link>
              </li>
              <li>
                <Link
                  href="/product"
                  className="block text-xl py-4 pr-4 pl-3 rounded hover:bg-gray-100 text-gray-400 hover:bg-gray-700 hover:text-white "
                >
                  WOMEN PERFUME
                </Link>
              </li> */}
              <li>
                <Link
                  href="/product/1673075255724?type=both"
                  className="block text-xl py-4 pr-4 pl-3 rounded text-gray-400 hover:bg-gray-700 hover:text-white ">
                  PERSONALIZE YOUR PERFUME
                </Link>
              </li>
              <li className="pt-4 flex justify-between pl-3 pr-4">
                <IconButton color="inherit" onClick={displaySearch}>
                  <SearchIcon className={"text-6xl"} />
                </IconButton>

                <IconButton color="inherit">
                  <ShoppingCartIcon className={"text-6xl"} />
                </IconButton>

                <IconButton color="inherit" onClick={handleLoginClick}>
                  <PersonOutlineOutlinedIcon className={"text-6xl"} />
                </IconButton>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
