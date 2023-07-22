import React, { LegacyRef, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";

import { Fonts } from "Data/Fonts";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { bagActions } from "store/slices/bag.slice";
import { useRouter } from "next/router";
import Header from "./header";
import Footer from "./footer";
import SideSection from "./side.section";
import Spinner from "components/Spinner";
import FrontPersonalize from "./frontPersonalize";
import BackPersonalize from "./backPersonalize";
import PreviewModal from "./preview";
import axios from "axios";
import { handleAxiosResponseError } from "utils";
import MobileToolbar from "./mobile.toolbar";
import dynamic from "next/dynamic";
import { UpdateVariant } from "model/add.product";
import { Bottle } from "model/interfaces";

const Canvas = dynamic(() => import("./three.modal"), {
  ssr: false,
});

interface Props {
  products: Array<any>;
  isLightTheme: boolean;
}

const Personalize: NextPage<Props> = ({ products, isLightTheme }) => {
  const router = useRouter();
  const {
    id,
    fragrance,
    weight,
    quantity,
    unitCost,
    inspiration,
    variantId,
  }: any = router.query;
  const frontImageRef = useRef(null);
  const backImageRef = useRef(null);
  const uploadMediaRef = useRef<any>(null);
  const uploadSketchRef = useRef<any>(null);
  const frontSketchRef = useRef<any>(null);
  const backSketchRef = useRef<any>(null);

  const bag = useAppSelector((state) => state.bag.currentBag);

  const [font, setFont] = useState(Fonts[0].type);
  const [value, setValue] = useState<string>("");
  const [textFont, setTextFont] = useState<string>("");
  const [fontSize, setFontSize] = useState({ front: "base", back: "base" });
  const [fontColor, setFontColor] = useState({
    front: "#000000",
    back: "#000000",
  });
  const [media, setMedia] = useState<any>({ front: "", back: "" });
  const [sketch, setSketch] = useState<any>({ front: "", back: "" });
  const [price, setPrice] = useState<number>(0);
  const [userText, setUserText] = useState({ front: "", back: "" });
  const [isSave, setIsSave] = useState(false);
  const [frontPersonalizeId, setFrontPersonalizeId] = useState<string>("");
  const [backPersonalizeId, setBackPersonalizeId] = useState<string>("");
  const [product, setProduct] = useState<Bottle>();
  const [isFront, setIsFront] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState({ front: "", back: "" });
  const [variant, setVariant] = useState<UpdateVariant>();
  const [frontPosition, setFrontPosition] = useState({
    text: { x: 0, y: 0 },
    image: { x: 0, y: 0 },
    sketch: { x: 0, y: 0 },
  });
  const [backPosition, setBackPosition] = useState({
    text: { x: 0, y: 0 },
    image: { x: 0, y: 0 },
    sketch: { x: 0, y: 0 },
  });

  const [isThreed, setIsThreed] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      setProduct(products.filter((item) => item.bottleId === id)[0]);
    }
  }, [id, products]);

  useEffect(() => {
    if (product) {
      const isVar = product?.variants?.find(
        (item: UpdateVariant) => item.variantId === variantId
      );

      if (isVar) setVariant(isVar);
    }
  }, [product]);

  if (!product || !variant) {
    return (
      <div className="flex h-screen bg-black">
        <div className="m-auto">
          <Spinner className="h-12 w-12 text-white" />
        </div>
      </div>
    );
  }

  const exportAsImage = async (elFront: any, elBack: any) => {
    setShowModal(true);
    if (elFront.classList.contains("hidden")) {
      elFront.classList.remove("hidden");
      elBack.classList.add("hidden");
    }

    const canvasFront = await html2canvas(elFront);
    const imageFront = canvasFront.toDataURL("image/png", 1.0);

    if (elBack.classList.contains("hidden")) {
      elBack.classList.remove("hidden");
      elFront.classList.add("hidden");
    }

    const canvasBack = await html2canvas(elBack);
    const imageBack = canvasBack.toDataURL("image/png", 1.0);

    setImages({ front: imageFront, back: imageBack });

    if (elFront.classList.contains("hidden"))
      elFront.classList.remove("hidden");

    if (!elBack.classList.contains("hidden")) elBack.classList.add("hidden");
  };

  const uploadMedia = (e: any) => {
    const target = e.target as HTMLInputElement;
    const mediaPrice = Number(product.personalizeInfo[0].mediaPrice);

    let tempmedia: any;

    if (target && target.files) {
      tempmedia = target.files[0];
      const fileType = target.files[0]["type"];
      const validImageTypes = ["image/png"];
      if (validImageTypes.includes(fileType)) {
        const reader = new FileReader();
        reader.readAsDataURL(tempmedia);
        reader.onloadend = () => {
          if (isFront) {
            if (!media.front) setPrice(price + mediaPrice);
            setMedia({ ...media, front: reader.result });
          } else {
            if (!media.back) setPrice(price + mediaPrice);
            setMedia({ ...media, back: reader.result });
          }
          setIsSave(false);
          // console.log(reader.result);
        };
      } else {
        toast.warning("Only PNG image will be acceptable");
      }
    }

    e.target.value = null;
  };

  const uploadSketch = (e: any) => {
    const target = e.target as HTMLInputElement;
    const mediaPrice = Number(product.personalizeInfo[0].mediaPrice);

    let tempmedia: any;

    if (target && target.files) {
      tempmedia = target.files[0];
      const fileType = target.files[0]["type"];
      const validImageTypes = ["image/png"];
      if (validImageTypes.includes(fileType)) {
        const reader = new FileReader();
        reader.readAsDataURL(tempmedia);
        reader.onloadend = () => {
          if (isFront) {
            if (!sketch.front) setPrice(price + mediaPrice);
            setSketch({ ...sketch, front: reader.result });
            // handleSketchClick();
            setTimeout(function () {
              handleSketchClick(frontSketchRef, "front");
            }, 1000);
          } else {
            if (!sketch.back) setPrice(price + mediaPrice);
            setSketch({ ...sketch, back: reader.result });
            setTimeout(function () {
              handleSketchClick(backSketchRef, "back");
            }, 1000);
          }
          setIsSave(false);
          // console.log(reader.result);
        };
      } else {
        toast.warning("Only PNG image will be acceptable");
      }
    }

    e.target.value = null;
  };

  const handleMediaUpload = () => {
    const current = uploadMediaRef.current;
    if (current) current.click();
  };

  const handleSketchUpload = () => {
    const current = uploadSketchRef.current;
    if (current) current.click();
  };

  const handleOrder = () => {
    if (!isSave && !isThreed) {
      return alert("Please! Preview and Save your Personalize");
    }

    const personalizeBottle = bag.find((item) => item.id === product.bottleId);

    if (personalizeBottle?.personalize) {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/personalize/delete/${personalizeBottle.personalize[0]}/${personalizeBottle.personalize[1]}`
        )
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(handleAxiosResponseError(err));
        });

      dispatch(
        bagActions.deltePersonalizeToBag({
          id: product.bottleId,
          fragranceId: fragrance,
        })
      );
    }

    if (isThreed) {
      const postData = {
        productId: product.bottleId,
        text: userText.front,
        is360Modal: true,
      };

      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/personalize`, postData)
        .then(({ data }) => {
          toast.success(data.message);
          const newdata = {
            id: product.bottleId,
            variantId: variant?.variantId,
            weight: weight,
            image: variant.frontImage,
            inspiration: inspiration,
            fragranceId: fragrance,
            fragranceCost: Number(weight) * Number(unitCost),
            quantity: quantity,
            personalize: [data.personalize.personalizeId],
            personalizePrice: price,
          };

          dispatch(bagActions.addBag(newdata));
          router.push("/bag");
        })
        .catch((err) => {
          console.log(handleAxiosResponseError(err));
          toast.error(handleAxiosResponseError(err));
        });
    } else {
      const data = {
        id: product.bottleId,
        variantId: variant.variantId,
        weight: weight,
        image: variant.frontImage,
        inspiration: inspiration,
        fragranceId: fragrance,
        fragranceCost: Number(weight) * Number(unitCost),
        quantity: quantity,
        personalize: [frontPersonalizeId, backPersonalizeId],
        personalizePrice: price,
      };

      dispatch(bagActions.addBag(data));
      router.push("/bag");
    }
  };

  // console.log("Product : ", product);

  const handleText = () => {
    const textPrice = Number(product.personalizeInfo[0].textPrice);

    if (isFront) {
      if (userText.front.length === 0) setPrice(price + textPrice);
      setUserText({ ...userText, front: value });
    } else {
      if (userText.back.length === 0) setPrice(price + textPrice);
      setUserText({ ...userText, back: value });
    }
    setIsSave(false);
    setValue("");
  };

  const handleMediaClear = () => {
    const mediaPrice = Number(product.personalizeInfo[0].mediaPrice);

    if (isFront) {
      setPrice(price - mediaPrice);
      setMedia({ ...media, front: "" });
    } else {
      setPrice(price - mediaPrice);
      setMedia({ ...media, back: "" });
    }
  };

  const handleSketchMediaClear = () => {
    const mediaPrice = Number(product.personalizeInfo[0].mediaPrice);

    if (isFront) {
      setPrice(price - mediaPrice);
      setSketch({ ...media, front: "" });
      let frontSketch = document.getElementById("frontSketch");
      if (frontSketch) frontSketch.innerHTML = "";
    } else {
      setPrice(price - mediaPrice);
      setSketch({ ...media, back: "" });
    }
  };

  const handleClearText = () => {
    const textPrice = Number(product.personalizeInfo[0].textPrice);
    if (isFront && userText.front) {
      setUserText({ ...userText, front: "" });
      setPrice(price - textPrice);
    }
    if (!isFront && userText.back) {
      setUserText({ ...userText, back: "" });
      setPrice(price - textPrice);
      let backSketch = document.getElementById("backSketch");
      if (backSketch) backSketch.innerHTML = "";
    }
  };

  const handle3dModal = () => {
    setIsThreed((current): boolean => !current);
  };

  const handleSketchClick = async (sketchRef: any, side: string) => {
    const filter = (bmp: any, filters = "") => {
      let canvas = Object.assign(document.createElement("canvas"), {
        width: 800,
        height: 800,
      });
      let ctx: any = canvas.getContext("2d");
      ctx.filter = filters;
      ctx.drawImage(bmp, 0, 0);
      return canvas;
    };
    // merge two canvas into one to generate sketch like image
    const generateSketch = async (bnw: any, blur: any) => {
      // let canvas = document.createElement("canvas");
      let canvas: any = document.createElement("canvas");
      canvas.width = 170;
      canvas.height = 170;
      canvas.__skipFilterPatch = true; // add this for safari ios
      let ctx = canvas.getContext("2d");
      ctx.drawImage(bnw, 0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "color-dodge";
      ctx.drawImage(blur, 0, 0, canvas.width, canvas.height);
      return canvas;
    };
    // first: step create bitmap from the `rawImg`
    let rawImg = sketchRef.current;
    let bmp = await createImageBitmap(rawImg);

    // second: generate a black & white and blur canvas using filter()
    let bnw = filter(bmp, "grayscale(1)");
    let blur = filter(bmp, "grayscale(1) invert(1) blur(5px)");
    // third: merge / combine `bnw` and `blur` canvas
    let sketchImg = await generateSketch(bnw, blur);
    // display output
    if (side === "front") {
      let frontSketch = document.getElementById("frontSketch");
      if (frontSketch) frontSketch.innerHTML = "";
      frontSketch?.prepend(sketchImg);
    } else {
      let backSketch = document.getElementById("backSketch");
      if (backSketch) backSketch.innerHTML = "";
      backSketch?.prepend(sketchImg);
    }
  };

  if (!product.personalizable) {
    return (
      <div className="flex h-screen bg-black">
        <div className="m-auto">Personalization Not available</div>
      </div>
    );
  }

  return (
    <div
      className={`h-[100vh] flex flex-col container mx-auto ${
        isLightTheme ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      {/* Header  */}
      <Header isLightTheme={isLightTheme} />
      {/* End of header */}

      <div className="h-[calc(100%-137px)] overflow-auto">
        <div className={`flex flex-col md:flex-row h-full`}>
          {/* Side bar and font selecttion section */}

          <SideSection
            handleText={handleText}
            setFont={setFont}
            handleMediaUpload={handleMediaUpload}
            handleSketchUpload={handleSketchUpload}
            setTextFont={setTextFont}
            setValue={setValue}
            uploadMedia={uploadMedia}
            uploadMediaRef={uploadMediaRef}
            uploadSketch={uploadSketch}
            uploadSketchRef={uploadSketchRef}
            value={value}
            font={font}
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontColor={fontColor}
            setFontColor={setFontColor}
            isFront={isFront}
            handleClearText={handleClearText}
            isLightTheme={isLightTheme}
            handle3dModal={handle3dModal}
            isThreed={isThreed}
            product={product}
            price={price}
          />

          {isThreed ? <Canvas text={userText} /> : <></>}
          <div className="flex w-auto mx-auto">
            <div className="flex flex-col w-full">
              <MobileToolbar
                handleText={handleText}
                setFont={setFont}
                handleMediaUpload={handleMediaUpload}
                setTextFont={setTextFont}
                setValue={setValue}
                uploadMedia={uploadMedia}
                uploadMediaRef={uploadMediaRef}
                value={value}
                font={font}
                fontSize={fontSize}
                setFontSize={setFontSize}
                fontColor={fontColor}
                setFontColor={setFontColor}
                isFront={isFront}
                handleClearText={handleClearText}
                isLightTheme={isLightTheme}
                handle3dModal={handle3dModal}
                isThreed={isThreed}
                uploadSketch={uploadSketch}
                uploadSketchRef={uploadSketchRef}
                handleSketchUpload={handleSketchUpload}
              />
              <div
                className={`${isThreed ? "hidden" : "flex"} lg:h-screen ${
                  showModal ? "flex-col" : "flex-row"
                } justify-between items-center w-full`}
              >
                {/* Slider Button */}
                <div className="my-auto">
                  <div
                    onClick={() => setIsFront(true)}
                    className={
                      isFront ? "cursor-not-allowed" : "cursor-pointer"
                    }
                  >
                    <Image
                      src="/icons/sliderLeft.png"
                      width="35"
                      height="35"
                      alt="sliderLeft"
                    />
                  </div>
                </div>

                <FrontPersonalize
                  fontColor={fontColor.front}
                  fontSize={fontSize.front}
                  frontImageRef={frontImageRef}
                  handleMediaClear={handleMediaClear}
                  media={media}
                  sketch={sketch}
                  variant={variant}
                  textFont={textFont}
                  userText={userText.front}
                  position={frontPosition}
                  setPosition={setFrontPosition}
                  isFront={isFront}
                  sketchRef={frontSketchRef}
                  handleSketchMediaClear={handleSketchMediaClear}
                />

                <BackPersonalize
                  fontColor={fontColor.back}
                  fontSize={fontSize.back}
                  backImageRef={backImageRef}
                  handleMediaClear={handleMediaClear}
                  sketch={sketch}
                  media={media}
                  variant={variant}
                  textFont={textFont}
                  userText={userText.back}
                  position={backPosition}
                  setPosition={setBackPosition}
                  isFront={isFront}
                  sketchRef={backSketchRef}
                  handleSketchMediaClear={handleSketchMediaClear}
                />
                <div className="my-auto">
                  <div
                    onClick={() => setIsFront(false)}
                    className={
                      !isFront ? "cursor-not-allowed" : "cursor-pointer"
                    }
                  >
                    <Image
                      src="/icons/sliderRight.png"
                      width="35"
                      height="35"
                      alt="slider right"
                    />
                  </div>
                </div>
              </div>

              <div className={`mt-auto p-3 ${isThreed && "hidden"} `}>
                <h1 className="text-2xl">Personalization Summary</h1>
                <div className="grid grid-cols-2 text-sm font-thin">
                  <span>Item Price</span>
                  <span className="text-right">
                    {product?.price ? product.price : 0}{" "}
                  </span>
                  <span>Personalization Price</span>
                  <span className="text-right"> {price}</span>
                  <span className="border-b border-wight my-2 col-span-2"></span>
                  <span>Total Price</span>
                  <span className="text-right">
                    Rs.{" "}
                    {Number(product?.price ? product.price : 0) + Number(price)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={`${isThreed && "hidden"}`}>
            {/* <div className="bg-[#FDF3EB] fixed h-full right-0 hidden lg:block hidden"> */}
            <div>
              <div
                className={`mx-auto bg-[#616162] cursor-pointer p-1 px-3 ${
                  isFront && "opacity-50"
                }`}
                onClick={() => setIsFront(true)}
              >
                <div className="relative h-20 w-20 mx-auto">
                  <Image
                    src={variant ? variant?.frontImage : "/images/blank.jpg"}
                    fill
                    alt="bottle3"
                    sizes="100vw"
                  />
                </div>
              </div>
              <div className="border-b-4 border-[#865D4C] w-4/5 mx-auto my-1"></div>
              <div className="text-center">Front</div>
            </div>

            {/* Back bottle image card */}
            <div>
              <div
                className={`mx-auto bg-[#616162] cursor-pointer p-1 px-3 ${
                  !isFront && "opacity-50"
                }`}
                onClick={() => setIsFront(false)}
              >
                <div className="relative h-20 w-20  mx-auto">
                  <Image
                    src={variant ? variant?.backImage : "/images/blank.jpg"}
                    fill
                    alt="bottle 3"
                    sizes="100vw"
                  />
                </div>
              </div>
              <div className="border-b-4 border-[#865D4C] w-4/5 mx-auto my-1"></div>
              <div className="text-center">Back</div>
            </div>
          </div>
        </div>
      </div>

      <Footer
        handleOrder={handleOrder}
        frontImageRef={frontImageRef}
        backImageRef={backImageRef}
        isThreed={isThreed}
        product={product}
        exportAsImage={exportAsImage}
        isLightTheme={isLightTheme}
      />

      <PreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        images={images}
        font={font}
        fontSize={fontSize}
        sketch={sketch}
        media={media}
        frontPersonalizeId={frontPersonalizeId}
        backPersonalizeId={backPersonalizeId}
        setFrontPersonalizeId={setFrontPersonalizeId}
        setBackPersonalizeId={setBackPersonalizeId}
        product={product}
        userText={userText}
        setIsSave={setIsSave}
      />
    </div>
  );
};

export default Personalize;
