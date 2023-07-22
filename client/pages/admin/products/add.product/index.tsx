import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { useForm, useWatch, useFieldArray } from "react-hook-form";
import { AddProductModal } from "model/add.product";
import { joiResolver } from "@hookform/resolvers/joi";
import { AddProductSchema } from "schemas/add.product.schema";
import Spinner from "components/Spinner";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { toast } from "react-toastify";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

interface AddProductProps {
  sideBarDisplay: boolean;
  setSideBarDisplay: Function;
  setAllProducts: Function;
  setProducts: Function;
}

const AddProduct: React.FC<AddProductProps> = ({
  sideBarDisplay,
  setSideBarDisplay,
  setAllProducts,
  setProducts,
}) => {
  const [files, setFile] = useState<Array<any>>([]);
  const [message, setMessage] = useState("");
  const [btnClick, setBtnClick] = useState(false);
  const imageRef = useRef<any>(null);
  const [personalizeInfo, setPersonalizeInfo] = useState({
    frontImagePointer: "",
    backImagePointer: "",
    textPrice: 0,
    artPrice: 0,
    mediaPrice: 0,
    minQuantity: 0,
  });
  const [isImageUpload, setImageUpload] = useState<boolean>(true);

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddProductModal>({
    defaultValues: {
      variants: [{ variantType: "", variantName: "" }],
    },
    resolver: joiResolver(AddProductSchema, {
      errors: { wrap: { label: "" } },
      abortEarly: false,
    }),
  });

  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control,
  });

  const isPersonalizable = useWatch({
    control,
    name: "personalizable",
  });

  const handleFile = (e: any): void => {
    setMessage("");
    const target = e.target as HTMLInputElement;

    if (target.files && target.files.length) {
      setImageUpload(false);
      let file: FileList = target.files;

      for (let i = 0; i < file.length; i++) {
        const fileType = file[i]["type"];
        const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
        if (validImageTypes.includes(fileType)) {
          axios
            .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/file/products`)
            .then(({ data }): void => {
              let options = {
                method: "PUT",
                headers: {
                  "Content-Type": fileType,
                },
                body: file[i],
              };

              fetch(data.secureUrl, options) //api for the get request
                .then((response): void => {
                  if (response.status === 200) {
                    console.log(response.url);
                    setFile((prev): any[] => [
                      ...prev,
                      { imagePointer: response.url.split("?")[0] },
                    ]);
                    setImageUpload(true);
                  }
                });
            })
            .catch((err): void => {
              console.log("Error : ", handleAxiosResponseError(err));
            });
        } else {
          setMessage("only images accepted");
        }
      }
    }
  };

  const handleProductImages = (e: any, image: any) => {
    const target = e.target as HTMLInputElement;

    if (target.files && target.files.length) {
      let file: FileList = target.files;

      for (let i = 0; i < file.length; i++) {
        const fileType = file[i]["type"];
        const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (validImageTypes.includes(fileType)) {
          axios
            .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/file/products`)
            .then(({ data }): void => {
              let options = {
                method: "PUT",
                headers: {
                  "Content-Type": fileType,
                },
                body: file[0],
              };

              fetch(data.secureUrl, options) //api for the get request
                .then((response): void => {
                  if (response.status === 200) {
                    setPersonalizeInfo({
                      ...personalizeInfo,
                      [image]: response.url.split("?")[0],
                    });
                  }
                });
            })
            .catch((err): void => {
              console.log("Error : ", handleAxiosResponseError(err));
            });
        } else {
          setMessage("only images accepted");
        }
      }
    }
  };

  const handleImageInputClick = (): void => {
    const current = imageRef.current;
    if (current) current.click();
  };

  const handleAddProduct = async (data: any): Promise<void> => {
    // console.log(data);
    setBtnClick(true);

    const postData = {
      ...data,
      media: files,
      // price,
      discount: 0,
      published: true,
      status: "selling",
      personalizeInfo,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bottle`, postData)
      .then(({ data }): void => {
        setAllProducts((prev: any) => [...prev, data.bottle]);
        setProducts((prev: any) => [...prev, data.bottle]);
        setSideBarDisplay(false);
        setBtnClick(false);
        setFile([]);
        // setPricing([{ unitOfMeasure: "", price: 0 }]);
        setPersonalizeInfo({
          frontImagePointer: "",
          backImagePointer: "",
          textPrice: 0,
          artPrice: 0,
          mediaPrice: 0,
          minQuantity: 0,
        });
        toast.success(data.message);
        reset();
      })
      .catch((err): void => {
        console.log("Error : ", handleAxiosResponseError(err));
        toast.error(handleAxiosResponseError(err));
        setBtnClick(false);
      });
  };

  const handleUploadVariant = (e: ChangeEvent, side: string, id: number) => {
    const target = e.target as HTMLInputElement;

    if (target.files && target.files.length) {
      let file: FileList = target.files;

      for (let i = 0; i < file.length; i++) {
        const fileType = file[i]["type"];
        const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (validImageTypes.includes(fileType)) {
          axios
            .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/file/products`)
            .then(({ data }): void => {
              let options = {
                method: "PUT",
                headers: {
                  "Content-Type": fileType,
                },
                body: file[0],
              };

              fetch(data.secureUrl, options) //api for the get request
                .then((response): void => {
                  if (response.status === 200) {
                    console.log(response.url);
                    if (side === "front")
                      setValue(
                        `variants.${id}.frontImage`,
                        response.url.split("?")[0]
                      );
                    else
                      setValue(
                        `variants.${id}.backImage`,
                        response.url.split("?")[0]
                      );
                  }
                });
            })
            .catch((err): void => {
              console.log("Error : ", handleAxiosResponseError(err));
            });
        } else {
          setMessage("only images accepted");
        }
      }
    }
  };

  const handleAppend = () => {
    append({ variantType: "", variantName: "", frontImage: "", backImage: "" });
  };

  const handleRemove = (index: number) => {
    if (fields.length > 1) remove(index);
  };

  return (
    <>
      <div
        className={`h-screen overflow-y-auto absolute top-0 right-0 w-3/6 text-white ease-in-out duration-300 bg-[#14181B]  ${
          sideBarDisplay == true ? "translate-x-0" : "translate-x-full hidden"
        } `}>
        <div className="h-[64px] p-1 px-3 flex justify-between items-center">
          <div>
            <div>Add Bottle</div>
            <div>Add your product and necessary information from here</div>
          </div>

          <div
            className="cursor-pointer"
            onClick={(): void => setSideBarDisplay(false)}>
            X
          </div>
        </div>

        {/* Inputs section */}
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <div className="bg-[#24262D] px-6 py-8">
            {/* INput 1 */}
            <div className="grid grid-cols-3 cursor-pointer">
              <div>Bottle image</div>
              <div className="col-span-2">
                <div
                  className="py-4 border border-dashed border-[#A09F9A] text-center"
                  onClick={handleImageInputClick}>
                  <input
                    type="file"
                    onChange={handleFile}
                    ref={imageRef}
                    className="hidden"
                    multiple
                    name="files[]"
                  />
                  <div>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>Drag your image here</div>
                  <div className="text-sm text-[#A09F9A]">
                    (Only *.jpeg and *.png images will be accepted)
                  </div>
                </div>
                {message.length ? (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {message}
                  </p>
                ) : (
                  <></>
                )}

                <div className="flex gap-2 mt-2">
                  {files?.map((file: any, key: number) => {
                    return (
                      <div
                        key={key}
                        className="h-16 flex items-center justify-between rounded p-3">
                        <div className="flex flex-row items-center gap-2">
                          <div className="relative h-12 w-12 ">
                            <Image src={file.imagePointer} fill alt="aws" />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {isImageUpload ? (
                    <></>
                  ) : (
                    <Spinner className="my-auto h-8 w-8 text-white" />
                  )}
                </div>
              </div>
            </div>

            {/* INput 3 */}
            <div className="grid grid-cols-3 my-5">
              <div>Bottle Title/Name</div>
              <div className="col-span-2">
                <input
                  type="text"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="Freshmaker Wipes"
                  {...register("bottleName")}
                />
                {errors.bottleName && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.bottleName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Stock</div>
              <div className="col-span-2">
                <input
                  type="number"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="Stock"
                  {...register("availableQuantity")}
                />
                {errors.availableQuantity && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.availableQuantity.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Price</div>
              <div className="col-span-2">
                <input
                  type="number"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="price"
                  {...register("price")}
                />
                {errors.price && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Capacity</div>
              <div className="col-span-2">
                <input
                  type="number"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="ml"
                  {...register("capacity")}
                />
                {errors.capacity && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.capacity.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Description</div>
              <div className="col-span-2">
                <textarea
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-2">
              <div>Variants</div>
              <div className="col-span-2">
                <div>
                  {fields.map((field, index) => (
                    <div className="items-center" key={field.id}>
                      <div className="flex">
                        <select
                          className="rounded bg-gray-700 border border-[#626366] p-1 py-1.5 w-2/5"
                          {...register(`variants.${index}.variantType`)}>
                          <option value="">Variant Type</option>
                          <option value="color">Color</option>
                        </select>
                        <input
                          placeholder="Variant Name"
                          className="rounded bg-gray-700 border border-[#626366] p-1 w-2/5 mx-4"
                          {...register(`variants.${index}.variantName`)}
                        />
                        <IoMdAdd
                          className="text-green-400 h-8 w-8 cursor-pointer hover:bg-slate-700 rounded-full mx-1"
                          onClick={handleAppend}
                        />
                        <IoMdRemove
                          className="text-red-400 h-8 w-8 cursor-pointer hover:bg-slate-700 rounded-full mx-1"
                          onClick={() => handleRemove(index)}
                        />
                      </div>
                      <div className="flex my-2">
                        <input
                          type="file"
                          onChange={(e) =>
                            handleUploadVariant(e, "front", index)
                          }
                        />
                        <input
                          type="file"
                          onChange={(e) =>
                            handleUploadVariant(e, "back", index)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Gender</div>
              <div className="col-span-2">
                <div id="gender" className="flex items-center">
                  <div className="mr-2 flex items-center">
                    <label htmlFor="true" className={`mr-1 `}>
                      Men
                    </label>
                    <input
                      type="radio"
                      value={"Men"}
                      {...register("categoryType")}
                    />
                  </div>
                  <div className="ml-2 flex items-center">
                    <label htmlFor="false" className="mr-1">
                      Women
                    </label>
                    <input
                      type="radio"
                      value={"Women"}
                      {...register("categoryType")}
                    />
                  </div>
                  <div className="ml-2 flex items-center">
                    <label htmlFor="false" className="mr-1">
                      Both
                    </label>
                    <input
                      type="radio"
                      value={"Both"}
                      {...register("categoryType")}
                    />
                  </div>
                </div>
                {errors.categoryType && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.categoryType.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Personalizable</div>
              <div className="col-span-2">
                <div id="personalizable" className="flex items-center">
                  <div className="mr-2 flex items-center">
                    <label htmlFor="true" className={`mr-1 `}>
                      True
                    </label>
                    <input
                      type="radio"
                      value={"true"}
                      {...register("personalizable")}
                    />
                  </div>
                  <div className="ml-2 flex items-center">
                    <label htmlFor="false" className="mr-1">
                      False
                    </label>
                    <input
                      type="radio"
                      value={"false"}
                      {...register("personalizable")}
                    />
                  </div>
                </div>
              </div>
            </div>
            {isPersonalizable?.toString() === "true" ? (
              <>
                <div className="grid grid-cols-3 my-5">
                  <div>Product Info</div>
                  <div className="col-span-2">
                    <div id="personalizable" className="">
                      <div className="">
                        <label htmlFor="front">Front Image : </label>
                        <input
                          type="file"
                          id="front"
                          onChange={(e) =>
                            handleProductImages(e, "frontImagePointer")
                          }
                        />
                      </div>
                      <div className="">
                        <label htmlFor="back">Back Image : </label>
                        <input
                          type="file"
                          id="back"
                          onChange={(e) =>
                            handleProductImages(e, "backImagePointer")
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 my-5">
                  <div>Personlize Price</div>
                  <div className="col-span-2 flex">
                    <input
                      type="number"
                      className="w-4/12 border rounded border-[#626366] outline-none bg-transparent px-4 py-1"
                      placeholder="Text Price"
                      onChange={(e) =>
                        setPersonalizeInfo({
                          ...personalizeInfo,
                          textPrice: Number(e.target.value),
                        })
                      }
                      required
                    />
                    <input
                      type="number"
                      className="w-4/12 border rounded border-[#626366] outline-none bg-transparent px-4 py-1"
                      placeholder="Art Price"
                      onChange={(e) =>
                        setPersonalizeInfo({
                          ...personalizeInfo,
                          artPrice: Number(e.target.value),
                        })
                      }
                      required
                    />
                    <input
                      type="number"
                      className="w-4/12 border rounded border-[#626366] outline-none bg-transparent px-4 py-1"
                      placeholder="Media Price"
                      onChange={(e) =>
                        setPersonalizeInfo({
                          ...personalizeInfo,
                          mediaPrice: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 my-5">
                  <div>Personalize Quantity</div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      className="w-4/12 border rounded border-[#626366] outline-none bg-transparent px-4 py-1"
                      placeholder="Min Quantity"
                      onChange={(e) =>
                        setPersonalizeInfo({
                          ...personalizeInfo,
                          minQuantity: Number(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* End of the input 5 */}
          </div>

          {/* End buttons section */}
          <div className="flex justify-around py-6 px-4">
            <button
              type="reset"
              className="bg-[#24262D] w-5/12 py-1 rounded-md"
              onClick={(): void => setSideBarDisplay(false)}>
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#DBC864] text-black rounded-md w-5/12 py-1">
              {btnClick ? (
                <Spinner className="mx-auto  h-8 w-8 text-gray-800" />
              ) : (
                "Add Bottle"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
