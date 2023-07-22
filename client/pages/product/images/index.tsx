import { BottleVariant } from "model/interfaces";
import Image from "next/image";
import React from "react";

interface ImagesProps {
  media: BottleVariant[];
  variant: BottleVariant;
  handleVariant: (value: string) => void;
}

const Media: React.FC<ImagesProps> = ({ media, variant, handleVariant }) => {
  return (
    <div className="w-full">
      <div className=" mx-auto">
        <div className="relative h-[400px] w-[400px] mx-auto">
          <Image
            // src="/images/productimage.png"
            src={variant ? variant.frontImage : "/images/blank.jpg"}
            fill
            alt="product picture"
          />
        </div>
      </div>

      <div className="w-full mt-4">
        <div className="flex">
          <div className="grid grid-cols-5 justify-center w-3/5 mx-auto gap-x-2">
            {media?.map((item: any, key: number) => (
              <div
                className="w-3/5 cursor-pointer hover:opacity-70"
                key={key}
                onClick={(): void => handleVariant(item.variantName)}
              >
                <Image
                  src={item.frontImage}
                  width="100"
                  height="100"
                  alt="product picture"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media;
