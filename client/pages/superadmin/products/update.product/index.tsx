import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import { AddProductModal } from "model/add.product";
import { joiResolver } from "@hookform/resolvers/joi";
import { UpdateProductSchema } from "schemas/add.product.schema";
import { toast } from "react-toastify";
import Spinner from "components/Spinner";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { ImCross } from "react-icons/im";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

interface UpdateProductProps {
  sideBarDisplay: boolean;
  setSideBarDisplay: Function;
  product: any;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({
  sideBarDisplay,
  setSideBarDisplay,
  product,
}) => {
  const {
    bottleId,
    bottleName,
    price,
    media,
    categoryType,
    personalizable,
    capacity,
    description,
    variants,
    availableQuantity,
  } = product;
  const [files, setFile] = useState<Array<any>>(media);
  const [message, setMessage] = useState("");
  const [btnClick, setBtnClick] = useState(false);
  const imageRef = useRef<any>(null);
  const [isImageUpload, setImageUpload] = useState<boolean>(true);

  const [personalizeInfo, setPersonalizeInfo] = useState(
    product?.personalizationInfo[0]
  );

  const {
    handleSubmit,
    register,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm<AddProductModal>({
    resolver: joiResolver(UpdateProductSchema, {
      errors: { wrap: { label: "" } },
      abortEarly: false,
    }),
    defaultValues: {
      bottleName,
      capacity,
      availableQuantity,
      categoryType,
      description,
      price,
      variants,
      personalizable: personalizable ? true : false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control,
  });
  const [isPersonalizable, setIsPersonalizable] = useState(personalizable);

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
            .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/file/product`)
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
            .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/file`, {
              url: personalizable[image],
            })
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

  const removeImage = (i: any): void => {
    if (i.mediaId) {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bottle/media/${i.mediaId}`
        )
        .then(({ data }): void => {
          setFile(files?.filter((x: any): boolean => x.mediaId !== i.mediaId));
          toast.success(data.message);
        })
        .catch((err): void => {
          toast.error(handleAxiosResponseError(err));
          console.log(handleAxiosResponseError(err));
        });
    } else {
      setFile(
        files?.filter((x: any): boolean => x.imagePointer !== i.imagePointer)
      );
    }
  };

  const handleImageInputClick = (): void => {
    const current = imageRef.current;
    if (current) current.click();
  };

  const handleUpdateProduct = async (data: any): Promise<void> => {
    setBtnClick(true);

    const postData = { ...data, media: files, personalizeInfo };

    console.log(postData);

    axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bottle/${bottleId}`,
        postData
      )
      .then(({ data }): void => {
        toast.success(data.message);
        setBtnClick(false);
      })
      .catch((err): void => {
        const error = handleAxiosResponseError(err);
        console.log("Error : ", error);
        toast.error(error);
        setBtnClick(false);
      });
  };

  const handleUploadVariant = (e: ChangeEvent, side: string, id: number) => {
    let target = e.target as HTMLInputElement;
    let url: string;

    if (side === "front") url = getValues(`variants.${id}.frontImage`);
    else url = getValues(`variants.${id}.backImage`);

    if (target.files && target.files.length) {
      let file: FileList = target.files;

      for (let i = 0; i < file.length; i++) {
        const fileType = file[i]["type"];
        const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (validImageTypes.includes(fileType) && url) {
          axios
            .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/file`, {
              url: url,
            })
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
        } else if (!url) {
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
    if (fields.length > 1) {
      const variantId = getValues(`variants.${index}`);
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/product/variant/${variantId}`
        )
        .then(({ data }) => {
          console.log(data);
          remove(index);
        })
        .catch((err) => {
          console.log(handleAxiosResponseError(err));
        });
    }
  };

  return (
    <>
      <div
        className={`h-screen overflow-y-auto absolute top-0 right-0 w-3/6  text-white ease-in-out duration-300 bg-[#14181B]  ${
          sideBarDisplay == true ? "translate-x-0" : "translate-x-full hidden"
        } `}>
        <div className="h-[64px]  p-1 px-3 flex justify-between items-center">
          <div>
            <div>Update Product</div>
            <div>Update your product and necessary information from here</div>
          </div>

          <div
            className="cursor-pointer"
            onClick={(): void => setSideBarDisplay(false)}>
            X
          </div>
        </div>

        {/* Inputs section */}
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
          <div className="bg-[#24262D] px-6 py-8">
            {/* INput 1 */}
            <div className="grid grid-cols-3 cursor-pointer">
              <div>Product image</div>
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
                  <div>U</div>
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

                {/* <DragImage /> */}
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
                          <div
                            onClick={(): void => {
                              removeImage(file);
                            }}
                            className="flex mb-8 mr-6 cursor-pointer justify-center rounded-full absolute hover:bg-slate-700">
                            <ImCross className="text-red-500 h-5 w-5 p-1" />
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

            <div className="grid grid-cols-3 my-5">
              <div>Bottle Title/Name</div>
              <div className="col-span-2">
                <input
                  type="text"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="Bottle Name"
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
                      checked={isPersonalizable === 1}
                      onChange={() => {
                        setIsPersonalizable(1);
                        setValue("personalizable", true, {
                          shouldDirty: false,
                          shouldTouch: false,
                          shouldValidate: false,
                        });
                      }}
                    />
                  </div>
                  <div className="ml-2 flex items-center">
                    <label htmlFor="false" className="mr-1">
                      False
                    </label>
                    <input
                      type="radio"
                      value={"false"}
                      checked={isPersonalizable === 0}
                      onChange={() => {
                        setIsPersonalizable(0);
                        setValue("personalizable", false, {
                          shouldDirty: false,
                          shouldTouch: false,
                          shouldValidate: false,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {isPersonalizable ? (
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
                      value={personalizeInfo.textPrice}
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
                      value={personalizeInfo.artPrice}
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
                      value={personalizeInfo.mediaPrice}
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
                      value={personalizeInfo.minQuantity}
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
          </div>

          {/* End buttons section */}
          <div className="flex justify-around py-6 px-4">
            <button
              type="button"
              className="bg-[#24262D] w-5/12 py-1 rounded-md"
              onClick={(): void => setSideBarDisplay(false)}>
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#DBC864] text-black rounded-md w-5/12 py-1"
              // onClick={() => setSideBarDisplay(false)}
            >
              {/* Add Product */}
              {btnClick ? (
                <Spinner className="mx-auto  h-8 w-8 text-gray-800" />
              ) : (
                "Update Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
