import React, { ChangeEvent, FC, useRef, useState } from "react";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { ImSpinner6 } from "react-icons/im";
import { toast } from "react-toastify";

const HeroSection: FC = () => {
  const [formData, setFormData] = useState<any>();
  const videoRef = useRef<any>();
  const uploadHeroBtn = useRef<any>();
  const [herobtnClick, setHeroBtnClick] = useState<boolean>(false);
  const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      console.log("click 1");
      // const form = new FormData();
      const video = target.files[0];

      // form.append("inputFile", video);
      console.log(video);
      setFormData(video);
    }
  };

  const handleClick = () => {
    videoRef.current.click();
  };

  const handleUpdate = () => {
    if (uploadHeroBtn.current) uploadHeroBtn.current.disabled = true;
    setHeroBtnClick(true);

    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/file/website-media`)
      .then(({ data }): void => {
        let options = {
          method: "PUT",
          headers: {
            "Content-Type": formData.type,
          },
          body: formData,
        };

        fetch(data.secureUrl, options) //api for the get request
          .then((response): void => {
            if (response.status === 200) {
              console.log(response.url.split("?")[0]);
              saveVideoInDB(response.url.split("?")[0]);
            }
          });
      })
      .catch((err): void => {
        uploadHeroBtn.current.disabled = false;
        setHeroBtnClick(false);
        toast.error(handleAxiosResponseError(err));
        console.log("Error : ", handleAxiosResponseError(err));
      });
  };

  const saveVideoInDB = (mediaPointer: string) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/page/hero`, {
        mediaPointer,
      })
      .then(({ data }) => {
        console.log(data);
        uploadHeroBtn.current.disabled = false;
        toast.success(data.message);
        setHeroBtnClick(false);
      })
      .catch((err) => {
        setHeroBtnClick(false);
        toast.error(handleAxiosResponseError(err));
        console.log(handleAxiosResponseError(err));
      });
  };

  return (
    <div className="py-5 border-b">
      <div className="text-xl font-bold">Hero Section</div>
      <div className="py-2 flex justify-center items-center">
        <label>Hero Section Video : </label>
        <div className="mx-auto">
          <div
            className={`w-40 text-black text-center justify-center items-center p-2 bg-white rounded-lg shadow-2xl tracking-wide uppercase border border-yellow-500 cursor-pointer hover:bg-yellow-200`}
            onClick={handleClick}
          >
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
            <input
              type="file"
              onChange={handleVideoUpload}
              ref={videoRef}
              className="hidden"
            />
          </div>
          {formData && <div>{formData.name}</div>}
        </div>
        <div>
          <button
            className="bg-white rounded text-black p-2 px-4 hover:bg-yellow-200 h-10 w-24"
            onClick={handleUpdate}
            ref={uploadHeroBtn}
          >
            {!herobtnClick ? (
              "Update"
            ) : (
              <ImSpinner6 className="animate-spin h-6 w-6 text-black p-0 mx-auto" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
