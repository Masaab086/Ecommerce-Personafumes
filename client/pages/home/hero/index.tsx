import React from "react";

interface HeroProps {
  hero: any;
  isLightTheme: boolean;
}

const Hero: React.FC<HeroProps> = ({ hero, isLightTheme }) => {
  return (
    <div
      className={`${
        isLightTheme ? "bg-white" : "bg-black"
      } flex justify-center py-12 pt-24 lg:py-0`}
    >
      <div className="inline-block align-middle">
        <div className="w-full aspect-h-9 aspect-w-16 relative rounded-2xl">
          <video autoPlay={true} muted={true} loop={true}>
            <source src={hero.mediaPointer} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default Hero;
