import axios from "config/axios";
import { NextPage } from "next";
import { ChangeEvent, useEffect, useState } from "react";
import { handleAxiosResponseError } from "utils";
import { toast } from "react-toastify";
import AddFragrance from "./add.fragrance";
import UpdateFragrance from "./update.fragrance";
import { MdModeEdit } from "react-icons/md";
import AdminLayout from "layout/admin.layout";
import SearchFragrance from "./search.fragrance";

const Fragrance: NextPage = () => {
  const [fragrances, setFragrances] = useState<Array<any>>([]);
  const [allFragrances, setAllFragrances] = useState<Array<any>>([]);
  const [fragrance, setFragrance] = useState<any>({});
  const [sideBarDisplay, setSideBarDisplay] = useState(false);
  const [updateSideBarDisplay, setUpdateSideBarDisplay] = useState(false);
  const [sortFragrances, setSortFragrances] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/fragrance`)
      .then(({ data }) => {
        console.log("Fragrances : ", data);
        setFragrances(data.fragrances);
        setAllFragrances(data.fragrances);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
      });
  }, []);

  // const handleFragranceDelete = (id: string) => {
  //   axios
  //     .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/fragrance/${id}`)
  //     .then(({ data }) => {
  //       setFragrances(
  //         fragrances.filter((fragrance) => fragrance.fragranceId !== id)
  //       );
  //       toast.success(data.message);
  //     })
  //     .catch((err) => {
  //       console.log(handleAxiosResponseError(err));
  //       toast.error(handleAxiosResponseError(err));
  //     });
  // };

  const handlePublish = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const value = e.target.checked;

    axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/fragrance/publish/${id}`,
        {
          published: value,
        }
      )
      .then(({ data }) => {
        setFragrances(
          fragrances.map((item: any) =>
            item.fragranceId === id ? { ...item, published: value } : item
          )
        );
        toast.success(data.message);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
        toast.error(handleAxiosResponseError(err));
      });
  };

  const handleEdit = (frg: any) => {
    setFragrance(frg);
    setUpdateSideBarDisplay(true);
  };

  function compareMen(a: any, b: any) {
    if (a.gender > b.gender) {
      return -1;
    }
    if (a.gender < b.gender) {
      return 1;
    }
    return 0;
  }

  function compareWomen(a: any, b: any) {
    if (a.gender < b.gender) {
      return -1;
    }
    if (a.gender > b.gender) {
      return 1;
    }
    return 0;
  }

  const handleSortOrders = (e: ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    if (target) {
      const value = target.value;
      setSortFragrances(value);
      if (value === "") setFragrances(allFragrances);
      else if (value === "date")
        setFragrances([...fragrances].sort(compareMen));
      else if (value === "amount")
        setFragrances([...fragrances].sort(compareWomen));
    }
  };

  return (
    <AdminLayout title="Fragrances" tab={6}>
      <div>
        {/* Input bar */}
        <div className="p-4 flex justify-between bg-[#222328] my-5 border border-[#363434] rounded-md">
          <SearchFragrance
            allFragrance={allFragrances}
            setFragrances={setFragrances}
          />

          <div className="">
            <select
              className="bg-transparent px-4 py-1 border border-[#938E8E] rounded-md"
              value={sortFragrances}
              onChange={handleSortOrders}
            >
              <option className="bg-black" value={""}>
                All
              </option>
              <option className="bg-black" value={"amount"}>
                Men
              </option>
              <option className="bg-black" value={"date"}>
                Women
              </option>
            </select>
          </div>
          <button
            className="bg-[#DBC864] text-black font-bold rounded-md px-4 py-2"
            onClick={(): void => setSideBarDisplay(true)}
          >
            + Add Fragrance
          </button>
        </div>
        {/* End of the input bar */}

        <div className="my-2 bg-[#222328]">
          <div className="flex justify-center">
            <table className="w-full m-1 border-separate border-spacing-y-3	">
              <thead className="w-full">
                <tr className="w-full bg-[#222328] p-8 border-[#9E9E9E]  rounded-md">
                  <td className="px-2 py-2 font-bold">ID</td>
                  <td className="px-2 py-2 font-bold">FRAGRANCE NAME</td>
                  <td className="px-2 py-2 font-bold">INSPIRATION</td>
                  <td className="px-2 py-2 font-bold">GENDER</td>
                  <td className="px-2 py-2 font-bold">PRICE</td>
                  <td className="px-2 py-2 font-bold">STOCK</td>
                  <td className="px-2 py-2 font-bold">TARGET</td>
                  <td className="px-2 py-2 font-bold">ACTIONS</td>
                </tr>
              </thead>

              <tbody>
                {fragrances.map((data: any, key) => {
                  return (
                    <tr
                      className="text-sm text-[#9E9E9E] my-3 bg-[#222328]  rounded-md "
                      key={key}
                    >
                      <td className="py-2 px-2">{data?.fragranceId}</td>
                      <td className="py-2 px-2">{data?.fragranceName}</td>
                      <td className="py-2 px-2">{data?.inspiration}</td>
                      <td className="py-2 px-2">{data?.gender}</td>
                      <td className="py-2 px-2">Rs. {data?.unitCost}</td>
                      <td className="py-2 px-2">{data?.availableUnites}</td>
                      <td className="py-2 px-2">{data?.target}</td>

                      <td className="py-1 px-2 flex">
                        <div className="mr-2">
                          <label
                            htmlFor={"default-toggle" + key}
                            className="inline-flex relative items-center cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={data.published}
                              id={"default-toggle" + key}
                              className="sr-only peer"
                              onChange={(e) =>
                                handlePublish(e, data?.fragranceId)
                              }
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-transparent after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:border-red-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                          </label>
                        </div>
                        <MdModeEdit
                          className="h-8 w-8 hover:bg-slate-700 rounded-full p-1 cursor-pointer"
                          onClick={() => handleEdit(data)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <AddFragrance
          setAllFragrances={setFragrances}
          sideBarDisplay={sideBarDisplay}
          setSideBarDisplay={setSideBarDisplay}
        />
        <UpdateFragrance
          setAllFragrances={setFragrances}
          sideBarDisplay={updateSideBarDisplay}
          setSideBarDisplay={setUpdateSideBarDisplay}
          fragrance={fragrance}
        />
      </div>
    </AdminLayout>
  );
};

export default Fragrance;
