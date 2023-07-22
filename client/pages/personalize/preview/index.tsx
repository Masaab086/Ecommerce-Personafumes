import Image from "next/image";
import React, { FC, useRef, useState } from "react";
import { handleAxiosResponseError } from "utils";
import axios from "config/axios";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import Spinner from "components/Spinner";
import { ImSpinner6, ImSpinner7, ImSpinner8 } from "react-icons/im";

interface PreviewModalProps {
  showModal: boolean;
  setShowModal: Function;
  images: any;
  product: any;
  userText: any;
  font: string;
  fontSize: any;
  sketch: any;
  media: any;
  setIsSave: Function;
  frontPersonalizeId: string;
  backPersonalizeId: string;
  setFrontPersonalizeId: Function;
  setBackPersonalizeId: Function;
}

const PreviewModal: FC<PreviewModalProps> = ({
  showModal,
  setShowModal,
  images,
  product,
  userText,
  font,
  fontSize,
  media,
  sketch,
  setIsSave,
  frontPersonalizeId,
  backPersonalizeId,
  setFrontPersonalizeId,
  setBackPersonalizeId,
}) => {
  const frontImageRef = useRef(null);
  const backImageRef = useRef(null);
  const [saveClick, setSaveClick] = useState<boolean>(false);

  const savePersonalisedData = (
    postImage: string,
    side: string,
    id?: string
  ) => {
    let data: any;

    if (side === "front")
      data = {
        productId: product.bottleId,
        uploadImage: postImage,
        text: userText.front,
        font: font,
        fontSize: fontSize.front,
        is360Modal: false,
        sketch: sketch.front
          ? Buffer.from(
              sketch.front.replace(/^data:image\/\w+;base64,/, ""),
              "base64"
            )
          : null,
        artFile: null,
        // image: media.front ? media.front : null,
        image: media.front
          ? Buffer.from(
              media.front.replace(/^data:image\/\w+;base64,/, ""),
              "base64"
            )
          : null,
      };
    else
      data = {
        productId: product.bottleId,
        uploadImage: postImage,
        text: userText.back,
        font: font,
        fontSize: fontSize.back,
        is360Modal: false,
        sketch: sketch.back
          ? Buffer.from(
              sketch.back.replace(/^data:image\/\w+;base64,/, ""),
              "base64"
            )
          : null,
        artFile: null,
        // image: media.back ? media.back : null,
        image: media.back
          ? Buffer.from(
              media.back.replace(/^data:image\/\w+;base64,/, ""),
              "base64"
            )
          : null,
      };

    if (id) {
      updatePersonalizeData(data, id);
    } else {
      postPersonalization(side, data);
    }
  };

  const updatePersonalizeData = (data: any, id: string) => {
    axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/personalize/${id}`, data)
      .then(({ data }) => {
        toast.success(data.message);
        setSaveClick(false);
        setShowModal(false);
      })
      .catch((err) => {
        setSaveClick(false);
        console.log(handleAxiosResponseError(err));
        toast.error(handleAxiosResponseError(err));
      });
  };

  const postPersonalization = (side: string, newData: any) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/file/personalize/url`)
      .then(({ data }) => {
        const secureUrls = data.secureUrls;

        if (newData.image) {
          let options = {
            method: "PUT",
            headers: {
              "Content-Type": "image/png",
            },
            body: newData.image,
          };

          fetch(secureUrls.url1, options) //api for the get request
            .then((response): void => {
              if (response.status === 200) {
                console.log("Image : ", response.url.split("?")[0]);
              }
            });
        }
        if (newData.sketch) {
          let options = {
            method: "PUT",
            headers: {
              "Content-Type": "image/png",
            },
            body: newData.sketch,
          };

          fetch(secureUrls.url2, options) //api for the get request
            .then((response): void => {
              if (response.status === 200) {
                console.log("Sketch : ", response.url.split("?")[0]);
              }
            });
        }

        const postData = {
          ...newData,
          image: newData?.image ? secureUrls.url1.split("?")[0] : null,
          sketch: newData?.sketch ? secureUrls.url2.split("?")[0] : null,
        };

        axios
          .post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/personalize`,
            postData
          )
          .then(({ data }) => {
            if (side === "front") {
              setFrontPersonalizeId(data.personalize.personalizeId);
            } else {
              setBackPersonalizeId(data.personalize.personalizeId);
            }
            toast.success(data.message);
            setShowModal(false);
            setSaveClick(false);
          })
          .catch((err) => {
            setSaveClick(false);
            console.log(handleAxiosResponseError(err));
            toast.error(handleAxiosResponseError(err));
          });
      })
      .catch((err) => {
        setSaveClick(false);
        console.log(handleAxiosResponseError(err));
        toast.error(handleAxiosResponseError(err));
      });
  };

  const updatePersonalize = (
    id: string,
    oldImage: string,
    newImage: string,
    side: string
  ) => {
    var buf = Buffer.from(
      newImage.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/file`, { url: oldImage })
      .then(({ data }): void => {
        let options = {
          method: "PUT",
          headers: {
            "Content-Type": "image/png",
          },
          body: buf,
        };

        fetch(data.secureUrl, options) //api for the get request
          .then((response): void => {
            if (response.status === 200) {
              setIsSave(true);
              savePersonalisedData(response.url.split("?")[0], side, id);
            }
          });
      })
      .catch((err): void => {
        console.log("Error : ", handleAxiosResponseError(err));
      });
  };

  const addPersonalize = (newImage: string, side: string) => {
    var buf = Buffer.from(
      newImage.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/file/personalization`)
      .then(({ data }): void => {
        let options = {
          method: "PUT",
          headers: {
            "Content-Type": "image/png",
          },
          body: buf,
        };

        fetch(data.secureUrl, options) //api for the get request
          .then((response): void => {
            if (response.status === 200) {
              setIsSave(true);
              savePersonalisedData(response.url.split("?")[0], side);
            }
          });
      })
      .catch((err): void => {
        console.log("Error : ", handleAxiosResponseError(err));
      });
  };

  const exportAsImage = async () => {
    if (!frontImageRef.current || !backImageRef.current) return;

    setSaveClick(true);
    const canvasFront = await html2canvas(frontImageRef.current);
    const imageFront = canvasFront.toDataURL("image/png", 1.0);

    const canvasBack = await html2canvas(backImageRef.current);
    const imageBack = canvasBack.toDataURL("image/png", 1.0);

    if (frontPersonalizeId || backPersonalizeId) {
      updatePersonalize(frontPersonalizeId, media.front, imageFront, "front");
      updatePersonalize(backPersonalizeId, media.back, imageBack, "back");
    } else {
      addPersonalize(imageFront, "front");
      addPersonalize(imageBack, "back");
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="w-auto my-6 mx-auto">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative overflow-x-auto flex flex-col w-full bg-black outline-none focus:outline-none">
                  {!images.front || !images.back ? (
                    <div className="flex w-2/4 h-2/5 bg-black">
                      <div className="m-auto">
                        <Spinner className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex mt-96 md:mt-0 justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-xl ml-20 md:ml-0 md:text-3xl font-semibold">
                          Preview Personalization
                        </h3>
                        <button
                          className="hidden md:flex p-1 ml-auto bg-transparent border-0 text-white opacity-80 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className="bg-transparent text-white opacity-80 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      <div className="p-6 flex h-full flex-col md:flex-row justify-between">
                        <div
                          className={`relative h-[500px] w-[500px] mx-auto`}
                          ref={frontImageRef}
                        >
                          <Image
                            src={images.front}
                            fill
                            alt="sliderfront"
                            sizes="100vw"
                          />
                        </div>
                        <div
                          className={`relative h-[500px] w-[500px] mx-auto`}
                          ref={backImageRef}
                        >
                          <Image
                            src={images.back}
                            fill
                            alt="sliderfront"
                            sizes="100vw"
                          />
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 disabled:cursor-not-allowed mr-16 md:mr-1"
                          type="button"
                          onClick={exportAsImage}
                          disabled={saveClick ? true : false}
                        >
                          {saveClick ? (
                            <ImSpinner6 className="animate-spin h-6 w-8 text-black" />
                          ) : (
                            "Save Changes"
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default PreviewModal;
