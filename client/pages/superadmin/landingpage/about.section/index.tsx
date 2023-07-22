import React, { ChangeEvent, FC, useRef, useState } from "react";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { ImSpinner6 } from "react-icons/im";
import { toast } from "react-toastify";
import { useFieldArray, useForm } from "react-hook-form";
import { AboutModal } from "model/update.landing.modal";
import { joiResolver } from "@hookform/resolvers/joi";
import { AboutSchema } from "schemas/update.landing.schema";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

interface AboutSectionProps {
  about: any;
}

const AboutSection: FC<AboutSectionProps> = ({ about }) => {
  const [formData, setFormData] = useState<string>("");
  const videoRef = useRef<any>();
  const [herobtnClick, setHeroBtnClick] = useState<boolean>(false);
  const [updatebtnClick, setUpdateBtnClick] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm<AboutModal>({
    resolver: joiResolver(AboutSchema, {
      errors: { wrap: { label: "" } },
      abortEarly: true,
    }),
    defaultValues: {
      detail: about.Detail,
      lists: about.list.map((item: string) => ({
        item: item,
      })),
      mediaPointer: about.mediaPointer,
      heading: about.heading,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "lists",
    control,
  });

  const handleClick = () => {
    videoRef.current.click();
  };

  const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      setHeroBtnClick(true);
      // const form = new FormData();
      const video = target.files[0];
      setFormData(video.name);

      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/file/website-media`)
        .then(({ data }): void => {
          let options = {
            method: "PUT",
            headers: {
              "Content-Type": video.type,
            },
            body: video,
          };

          fetch(data.secureUrl, options) //api for the get request
            .then((response): void => {
              if (response.status === 200) {
                console.log(response.url.split("?")[0]);
                setValue("mediaPointer", response.url.split("?")[0]);
                setHeroBtnClick(false);
              }
            });
        })
        .catch((err): void => {
          setHeroBtnClick(false);
          toast.error(handleAxiosResponseError(err));
          console.log("Error : ", handleAxiosResponseError(err));
        });
    }
  };

  const handleSectionUpdate = (data: AboutModal) => {
    console.log(data);
    setUpdateBtnClick(true);
    axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/page/about`, data)
      .then(({ data }) => {
        console.log(data);
        setUpdateBtnClick(false);
        toast.success(data.message);
      })
      .catch((err) => {
        setUpdateBtnClick(false);
        toast.error(handleAxiosResponseError(err));
        console.log(handleAxiosResponseError(err));
      });
  };

  const handleAppend = () => {
    console.log("append");
    append({ item: "" });
  };

  const handleRemove = (index: number) => {
    console.log("remove");
    if (fields.length > 1) remove(index);
  };

  return (
    <div className="py-5 border-b">
      <div className="text-xl font-bold">About Section</div>
      <form onSubmit={handleSubmit(handleSectionUpdate)}>
        <div className="py-2 flex justify-center items-center">
          <label>About Section Video : </label>
          <div className="mx-auto">
            <div
              className={`w-40 text-black text-center justify-center items-center p-2 bg-white rounded-lg shadow-2xl tracking-wide uppercase border border-yellow-500 cursor-pointer hover:bg-yellow-200`}
              onClick={handleClick}
            >
              {herobtnClick ? (
                <ImSpinner6 className="animate-spin h-6 w-6 text-black p-0 mx-auto" />
              ) : (
                <>
                  <svg
                    className="w-8 h-8 mx-auto"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-sm text-black leading-normal">
                    Select a video
                  </span>
                </>
              )}
              <input
                type="file"
                onChange={handleVideoUpload}
                ref={videoRef}
                className="hidden"
              />
            </div>
            {formData && <div>{formData}</div>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-12">
          <div>
            <div className="grid grid-cols-2">
              <label>Heading : </label>
              <input
                className="col-start-2 rounded bg-gray-700 border border-white p-1"
                {...register("heading")}
              />
            </div>
            <div className="grid grid-cols-2">
              <label>List : </label>
              <div>
                {fields.map((field, index) => (
                  <div className="flex justify-center items-center" key={index}>
                    <input
                      key={field.id}
                      className="rounded bg-gray-700 border border-white p-1 w-full my-2"
                      {...register(`lists.${index}.item`)}
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
                ))}
              </div>
            </div>
          </div>
          <div className="flex">
            <label className="pr-6">Detail </label>
            <textarea
              rows={5}
              className="bg-gray-700 rounded border border-white p-1 w-full"
              {...register("detail")}
            />
          </div>
        </div>
        <button
          className="bg-white rounded text-black p-2 px-4 hover:bg-yellow-200 h-10 w-24"
          type="submit"
        >
          {!updatebtnClick ? (
            "Update"
          ) : (
            <ImSpinner6 className="animate-spin h-6 w-6 text-black p-0 mx-auto" />
          )}
        </button>
      </form>
    </div>
  );
};

export default AboutSection;
