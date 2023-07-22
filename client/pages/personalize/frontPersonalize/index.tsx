import Resize from "components/resize";
import { UpdateVariant } from "model/add.product";
import Image from "next/image";
import { FC, LegacyRef, useRef } from "react";
import Draggable from "react-draggable";
import { MdOutlineClear } from "react-icons/md";

interface FrontProps {
  frontImageRef: any;
  variant: UpdateVariant;
  handleSketchMediaClear: () => void;
  fontSize: string;
  textFont: string;
  fontColor: string;
  userText: string;
  media: any;
  sketch: any;
  handleMediaClear: any;
  position: any;
  setPosition: any;
  isFront: boolean;
  sketchRef: any;
}

const FrontPersonalize: FC<FrontProps> = ({
  frontImageRef,
  variant,
  fontColor,
  fontSize,
  textFont,
  userText,
  media,
  sketch,
  handleMediaClear,
  handleSketchMediaClear,
  position,
  setPosition,
  isFront,
  sketchRef,
}) => {
  const nodeRef = useRef(null);
  const frontMediaRef = useRef(null);
  const frontSketchRef = useRef(null);

  const handleDrag = (e: any, data: any) => {
    setPosition({ ...position, text: { x: data.x, y: data.y } });
  };

  const handleImageDrag = (e: any, data: any) => {
    setPosition({ ...position, image: { x: data.x, y: data.y } });
  };
  const handleSketchImageDrag = (e: any, data: any) => {
    setPosition({ ...position, sketch: { x: data.x, y: data.y } });
  };

  return (
    <div
      className={`relative h-96 w-96 md:h-[600px] md:w-[600px] mx-auto ${
        !isFront && "hidden"
      }`}
      ref={frontImageRef}
    >
      <Image
        // src="/images/sliderFront.png"
        src={variant ? variant.frontImage : "/images/blank.jpg"}
        fill
        alt="sliderfront"
        sizes="100vw"
      />

      <div className="h-40 w-44 ml-8 mt-48 absolute">
        <Draggable
          nodeRef={nodeRef}
          onDrag={handleDrag}
          position={position.text}
          positionOffset={{ x: 180, y: 50 }}
        >
          <div
            ref={nodeRef}
            className={`cursor-move w-max h-max text-${fontSize} ${textFont}`}
            style={{ color: `${fontColor}` }}
          >
            {userText}
          </div>
        </Draggable>
      </div>
      <div className="absolute h-20 w-60 mt-32">
        {media.front ? (
          <Draggable
            nodeRef={frontMediaRef}
            onDrag={handleImageDrag}
            position={position.image}
          >
            <div ref={frontMediaRef}>
              <Resize media={media.front} handleMediaClear={handleMediaClear} />
            </div>
          </Draggable>
        ) : (
          <></>
        )}
      </div>
      <div className="absolute h-20 w-60 mt-32">
        <img
          src={sketch.front}
          alt="upload your media"
          height={150}
          width={150}
          ref={sketchRef}
          className="hidden"
        />
        {sketch.front ? (
          <Draggable
            nodeRef={frontSketchRef}
            onDrag={handleSketchImageDrag}
            position={position.sketch}
          >
            <div ref={frontSketchRef} className="clear_div">
              <div
                className="absolute clear_icon"
                onClick={handleSketchMediaClear}
              >
                <MdOutlineClear className="w-4 h-4 cursor-pointer bg-red-700 rounded" />
              </div>
              <div id="frontSketch"></div>
            </div>
          </Draggable>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default FrontPersonalize;
