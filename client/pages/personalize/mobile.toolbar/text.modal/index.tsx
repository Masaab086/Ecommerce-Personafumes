import { ChangeEvent, FC } from "react";
import { Fonts } from "Data/Fonts";

// Create new plugin instance

interface TextModalProps {
  handleModalShow: Function;
  modal: boolean;
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
}

const TextModal: FC<TextModalProps> = ({
  handleModalShow,
  modal,
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
    <div
      className={`modal fade fixed z-10 top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto bg-gray-500/50 ${
        !modal && "hidden"
      }`}
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-scrollable relative w-11/12 mx-auto pointer-events-none top-10">
        <div
          className={`modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto  bg-clip-padding rounded-md outline-none ${
            isLightTheme ? "text-black bg-[#FDF3EB]" : "bg-black text-white"
          } `}
        >
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-500 rounded-t-md">
            <h5
              className={`text-xl font-medium leading-normal ${
                isLightTheme ? "text-black" : "text-white"
              } `}
            >
              Order Products
            </h5>
            <button
              type="button"
              className=" box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:opacity-75 hover:no-underline"
              onClick={() => handleModalShow(false)}
            >
              X
            </button>
          </div>
          <div className="relative p-4">
            <div
              className={`border-[0.01px] border-[#616162] ${
                isLightTheme ? "bg-white" : "bg-[#14181B]"
              }`}
            >
              <div className="pl-4 pb-4">
                <label htmlFor="text" className="text-lg">
                  Enter your text :{" "}
                </label>
                <input
                  type="text"
                  id="text"
                  value={value}
                  onChange={(e: any) => setValue(e.target.value)}
                  className="bg-transparent rounded p-1 border border-1"
                />
                <button
                  className={`${
                    isLightTheme
                      ? "bg-[#865D4C] text-white"
                      : "bg-yellow-200 text-black"
                  } py-1 px-2 ml-1 rounded hover:bg-yellow-300`}
                  onClick={handleText}
                >
                  Add
                </button>
              </div>
              <div
                className={`lg:flex lg:flex-cols mt-4 ${isThreed && "hidden"} `}
              >
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
                  <select
                    className={`appearance-none px-3 py-1 text-base font-normal text-white ${
                      isLightTheme ? "bg-[#865D4C]" : "bg-black"
                    }  border border-solid rounded transition ease-in-out m-0 focus:outline-none cursor-pointer w-auto`}
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
              <div
                className={`m-4 hover:underline cursor-pointer ${
                  isThreed && "hidden"
                }`}
                onClick={handleClearText}
              >
                {/* <MdOutlineClear className="h-8 w-8 mx-4 p-1 text-red-500 cursor-pointer rounded-2xl hover:bg-red-100/50" /> */}
                Remove Text
              </div>
              <p className={`m-5 ${isThreed && "hidden"}`}>
                Selected Font: {font}
              </p>

              <div
                className={`${
                  isThreed ? "hidden" : "grid"
                } grid-cols-4 m-4 gap-5`}
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
          </div>
          <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-500 rounded-b-md">
            <button
              type="button"
              className="inline-block px-6 py-2.5 bg-[#865D4C] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={() => handleModalShow(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextModal;
