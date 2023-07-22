import Image from "next/image";
import { FC, useState } from "react";
import TextModal from "./text.modal";
import { GiSideswipe } from "react-icons/gi";
import { MdOutline360 } from "react-icons/md";
import { SiSketchup } from "react-icons/si";
import { GoCloudUpload, GoTextSize } from "react-icons/go";
import { AiOutlinePicture } from "react-icons/ai";

interface MobileToolbarProps {
  handleMediaUpload: any;
  uploadMediaRef: any;
  uploadMedia: any;
  uploadSketch: any;
  handleSketchUpload: any;
  uploadSketchRef: any;
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
  isThreed: boolean;
  handle3dModal: any;
}

const MobileToolbar: FC<MobileToolbarProps> = ({
  handleMediaUpload,
  uploadMediaRef,
  uploadMedia,
  uploadSketch,
  uploadSketchRef,
  handleSketchUpload,
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
  isThreed,
  handle3dModal,
}) => {
  const [textModal, setTextModal] = useState(false);

  const handleTextModal = () => {
    setTextModal(!textModal);
  };
  return (
    <div className="flex justify-center mb-2 lg:hidden text-black">
      <div
        className="text-center p-1 hover:bg-[#1D1D1D] cursor-pointer hover:bg-slate-800"
        onClick={handleTextModal}
      >
        <div className="flex justify-center">
          <GoTextSize
            className={`h-8 w-8 ${
              isLightTheme ? "text-[#865D4C]" : "text-white"
            } `}
          />
        </div>
        <div>Add Text</div>
      </div>

      <div
        className={`${isThreed && "hidden"} text-center p-1 cursor-pointer ${
          isLightTheme ? "hover:bg-slate-200" : "hover:bg-slate-800"
        } `}
      >
        {/* <div className="text-3xl w-2/5 mx-auto"> */}
        <div className="flex justify-center">
          <AiOutlinePicture
            className={`h-8 w-8 ${
              isLightTheme ? "text-[#865D4C]" : "text-white"
            } `}
          />
        </div>
        {/* </div> */}
        <div>Add Art</div>
      </div>
      {/* End of text selection */}
      {/* Text selection */}
      <div
        className={`${isThreed && "hidden"} text-center p-1 cursor-pointer ${
          isLightTheme ? "hover:bg-slate-200" : "hover:bg-slate-800"
        } `}
        onClick={handleMediaUpload}
      >
        {/* <div className="text-3xl w-2/5 mx-auto"> */}
        <div className="flex justify-center">
          <GoCloudUpload
            className={`h-8 w-8 ${
              isLightTheme ? "text-[#865D4C]" : "text-white"
            } `}
          />
        </div>
        {/* </div> */}
        <div>Upload</div>
        <input
          className="hidden"
          type="file"
          ref={uploadMediaRef}
          onChange={uploadMedia}
        />
      </div>

      <div
        className={`${isThreed && "hidden"} text-center p-1 cursor-pointer ${
          isLightTheme ? "hover:bg-slate-200" : "hover:bg-slate-800"
        } `}
        onClick={handleSketchUpload}
      >
        <div className="flex justify-center">
          <SiSketchup
            className={`h-8 w-8 ${
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
        className={`text-center hidden p-1 cursor-pointer ${
          isLightTheme ? "hover:bg-slate-200" : "hover:bg-slate-800"
        } `}
        onClick={handle3dModal}
      >
        {isThreed ? (
          <>
            <div className="flex justify-center">
              <GiSideswipe
                className={`h-8 w-8 ${
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
                className={`h-8 w-8 ${
                  isLightTheme ? "text-[#865D4C]" : "text-white"
                } `}
              />
            </div>
            <div>360 View</div>
          </>
        )}
      </div>
      <TextModal
        handleModalShow={handleTextModal}
        modal={textModal}
        handleText={handleText}
        setFont={setFont}
        setTextFont={setTextFont}
        setValue={setValue}
        value={value}
        font={font}
        fontSize={fontSize}
        setFontSize={setFontSize}
        fontColor={fontColor}
        setFontColor={setFontColor}
        isFront={isFront}
        handleClearText={handleClearText}
        isLightTheme={isLightTheme}
        isThreed={isThreed}
      />
    </div>
  );
};

export default MobileToolbar;
