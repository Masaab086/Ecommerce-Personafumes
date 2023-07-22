import Button from "components/Button";
import { Fonts } from "Data/Fonts";
import { ChangeEvent, FC } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { GiSideswipe } from "react-icons/gi";
import { GoCloudUpload } from "react-icons/go";
import { MdOutline360 } from "react-icons/md";
import { SiSketchup } from "react-icons/si";

interface SideSectionProps {
  handleMediaUpload: any;
  handleSketchUpload: any;
  uploadMediaRef: any;
  uploadSketchRef: any;
  uploadMedia: any;
  uploadSketch: any;
  value: string;
  setValue: any;
  handleText: any;
  setTextFont: any;
  setFont: any;
  font: string;
  fontSize: any;
  fontColor: any;
  setFontSize: Function;
  setFontColor: Function;
  handleClearText: () => void;
  isFront: boolean;
  isLightTheme: boolean;
  handle3dModal: any;
  isThreed: boolean;
  product: any;
  price: number;
}

const SideSection: FC<SideSectionProps> = ({
  handleMediaUpload,
  handleSketchUpload,
  uploadMediaRef,
  uploadSketchRef,
  uploadMedia,
  uploadSketch,
  value,
  setValue,
  handleText,
  setTextFont,
  setFont,
  font,
  fontSize,
  fontColor,
  setFontColor,
  setFontSize,
  isFront,
  handleClearText,
  isLightTheme,
  handle3dModal,
  isThreed,
  price,
  product,
}) => {
  const handleFontColor = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    if (isFront) setFontColor({ ...fontColor, front: target.value });
    else setFontColor({ ...fontColor, back: target.value });
  };

  const handleFontSize = (e: ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    if (isFront) setFontSize({ ...fontSize, front: target.value });
    else setFontSize({ ...fontSize, back: target.value });
  };

  return (
    <div className="hidden lg:flex w-4/12">
      {/* Side bar */}
      <div
        className={`fixed z-0 h-full border-t border-[#616162] w-20 ${
          isLightTheme ? "bg-[#FDF3EB]" : "bg-[#14181B]"
        }`}
      >
        {/* Text selection */}
        {/* <div
          className={`text-center p-1 my-8 cursor-pointer ${
            isLightTheme ? "hover:bg-slate-200" : "hover:bg-slate-800"
          } `}
        >
          <div className="text-3xl">T</div>
          <div>Add Text</div>
        </div> */}
        {/* End of text selection */}
        {/* Text selection */}
        <div
          className={`${
            isThreed && "hidden"
          } text-center p-1 my-8 cursor-pointer ${
            isLightTheme ? "hover:bg-slate-200" : "hover:bg-slate-800"
          } `}
        >
          <div className="text-3xl w-2/5 mx-auto">
            <div className="flex justify-center">
              <AiOutlinePicture
                className={`h-10 w-10 ${
                  isLightTheme ? "text-[#865D4C]" : "text-white"
                } `}
              />
            </div>
          </div>
          <div>Add Art</div>
        </div>
        {/* End of text selection */}
        {/* Text selection */}
        <div
          className={`${
            isThreed && "hidden"
          } text-center p-1 my-8 cursor-pointer ${
            isLightTheme ? "hover:bg-slate-200" : "hover:bg-slate-800"
          } `}
          onClick={handleMediaUpload}
        >
          <div className="text-3xl w-2/5 mx-auto">
            <div className="flex justify-center">
              <GoCloudUpload
                className={`h-10 w-10 ${
                  isLightTheme ? "text-[#865D4C]" : "text-white"
                } `}
              />
            </div>
          </div>
          <div>Upload</div>
          <input
            className="hidden"
            type="file"
            ref={uploadMediaRef}
            onChange={uploadMedia}
          />
        </div>

        <div
          className={`${
            isThreed && "hidden"
          } text-center p-1 my-8 cursor-pointer ${
            isLightTheme ? "hover:bg-slate-200" : "hover:bg-slate-800"
          } `}
          onClick={handleSketchUpload}
        >
          <div className="flex justify-center">
            <SiSketchup
              className={`h-10 w-10 ${
                isLightTheme ? "text-[#865D4C]" : "text-white"
              } `}
            />
          </div>
          <div>Add Sketch</div>
          <input
            className="hidden"
            type="file"
            ref={uploadSketchRef}
            onChange={uploadSketch}
          />
        </div>

        <div
          className={`text-center hidden p-1 my-8 cursor-pointer ${
            isLightTheme ? "hover:bg-slate-200" : "hover:bg-slate-800"
          } `}
          onClick={handle3dModal}
        >
          {isThreed ? (
            <>
              <div className="flex justify-center">
                <GiSideswipe
                  className={`h-10 w-10 ${
                    isLightTheme ? "text-[#865D4C]" : "text-white"
                  } `}
                />
              </div>
              <div>Normal View</div>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <MdOutline360
                  className={`h-10 w-10 ${
                    isLightTheme ? "text-[#865D4C]" : "text-white"
                  } `}
                />
              </div>
              <div>360 View</div>
            </>
          )}
        </div>
        {/* End of text selection */}
      </div>

      <div className="ml-20 w-10/12">
        <div
          className={`border-[0.01px] border-[#616162] ${
            isLightTheme ? "bg-[#FDF3EB]" : "bg-[#14181B]"
          } `}
        >
          <div className="pl-4">
            <label htmlFor="text" className="text-lg">
              Enter your text :{" "}
            </label>
            <input
              type="text"
              id="text"
              value={value}
              onChange={(e: any) => setValue(e.target.value)}
              className={`bg-transparent rounded border-2 p-1 ${
                isLightTheme ? "border-[#865D4C]" : "border-white"
              }`}
            />
            <button
              className={` ${
                isLightTheme
                  ? "bg-[#865D4C] text-white"
                  : "bg-yellow-200 text-black"
              } py-1 px-2 ml-1 rounded hover:bg-yellow-300`}
              onClick={handleText}
            >
              Add
            </button>
          </div>
          <div className="lg:flex lg:flex-cols mt-4 mb-4">
            <div className="whitespace-nowrap pl-4">
              <label htmlFor="colorpicker" className="pb-1">
                Select Color :{" "}
              </label>
              <input
                type="color"
                name="color"
                id="colorpicker"
                value={isFront ? fontColor.front : fontColor.back}
                onChange={handleFontColor}
                className="rounded mt-1"
              />
            </div>
            <div className={`pl-4 ${isThreed ? "hidden" : "flex"}`}>
              <div>
                <select
                  className="appearance-none px-3 py-1 text-base font-normal text-black border border-solid rounded transition ease-in-out m-0 focus:outline-none cursor-pointer w-auto"
                  value={isFront ? fontSize.front : fontSize.back}
                  onChange={handleFontSize}
                >
                  <option value="">Font Size</option>
                  <option value="xs">xs</option>
                  <option value="sm">sm</option>
                  <option value="base">medium</option>
                  <option value="lg">lg</option>
                  <option value="xl">xl</option>
                  <option value="2xl">2xl</option>
                  <option value="3xl">3xl</option>
                  <option value="5xl">5xl</option>
                  <option value="6xl">6xl</option>
                  <option value="7xl">7xl</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex">
            <div
              className={`m-4 hover:underline cursor-pointer ${
                isThreed && "hidden"
              } `}
              onClick={handleClearText}
            >
              Remove Text
            </div>
          </div>
          <p className={`m-5 ${isThreed && "hidden"} `}>
            Selected Font: {font}
          </p>

          <div
            className={`${isThreed ? "hidden" : "grid"} grid-cols-4 m-4 gap-5`}
          >
            {Fonts.map((item, key) => {
              return (
                <div
                  className={`w-full h-16 border border-white rounded p-1 text-center cursor-pointer hover:outline hover:outline-2 outline-[#DBC864] hover:text-[#DBC864] ${
                    item.fontType
                  } ${
                    font === item.type &&
                    "outline outline-2 outline-[#DBC864] text-[#DBC864]"
                  }`}
                  onClick={() => {
                    setTextFont(item.fontType);
                    setFont(item.type);
                  }}
                  key={key}
                >
                  <div className={item.fontType}>{item.text}</div>
                  <div className={`text-[10px] ${item.fontType}`}>
                    {item.type}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`my-4 ${
            isLightTheme ? "bg-[#FDF3EB]" : "bg-[#14181B]"
          } p-5 flex flex-col justify-center border border-[#616162]`}
        >
          <div className="text-center text-sm">
            For personalizing large orders, please see our wide selection of
            products
          </div>

          <Button
            text={"Personalization Large Order"}
            type={"yellow"}
            customStyle={"w-4/5 mx-auto py-2 my-3"}
            isLightTheme={isLightTheme}
          />
        </div>
        <div className={`mt-auto p-3 hidden`}>
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
              Rs. {Number(product?.price ? product.price : 0) + Number(price)}
            </span>
          </div>
        </div>
      </div>
      {/* Text selection grid */}
    </div>
  );
};

export default SideSection;
