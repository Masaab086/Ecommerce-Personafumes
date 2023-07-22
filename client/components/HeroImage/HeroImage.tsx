import React from "react";
import Image from "next/image";

const HeroImage = () => {
  return (
    <div className="h-[80vh] w-2/4 p-6 hidden lg:flex justify-center items-center">
      <div className="w-full aspect-h-9 aspect-w-16 relative rounded-2xl">
        <video autoPlay={true} muted={true} loop={true}>
          <source
            src={
              "https://personafumes.s3.me-south-1.amazonaws.com/website-media/Rotation_360.mp4"
            }
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

export default HeroImage;
