import { FC, MouseEvent } from "react";
import { AiFillStar } from "react-icons/ai";

interface StarsProps {
  handleMouseHover?: (e: MouseEvent) => void;
  handleMouseLeave?: () => void;
  handleRatingClick?: (id: Number) => void;
  rat: Number;
}

const Stars: FC<StarsProps> = ({
  handleMouseHover,
  handleMouseLeave,
  handleRatingClick,
  rat,
}) => {
  return (
    <div className="flex">
      <div
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseLeave}
        id="1"
        onClick={() => (handleRatingClick ? handleRatingClick(1) : () => {})}
      >
        <AiFillStar
          className={`${
            rat >= 1 ? "text-yellow-400" : ""
          } w-8 h-8 cursor-pointer`}
          id="1"
        />
      </div>
      <div
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseLeave}
        id="2"
        onClick={() => (handleRatingClick ? handleRatingClick(2) : () => {})}
      >
        <AiFillStar
          className={`${
            rat >= 2 ? "text-yellow-400" : ""
          } w-8 h-8 cursor-pointer`}
          id="2"
        />
      </div>
      <div
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseLeave}
        id="3"
        onClick={() => (handleRatingClick ? handleRatingClick(3) : () => {})}
      >
        <AiFillStar
          className={`${
            rat >= 3 ? "text-yellow-400" : ""
          } w-8 h-8 cursor-pointer`}
          id="3"
        />
      </div>
      <div
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseLeave}
        id="4"
        onClick={() => (handleRatingClick ? handleRatingClick(4) : () => {})}
      >
        <AiFillStar
          className={`${
            rat >= 4 ? "text-yellow-400" : ""
          } w-8 h-8 cursor-pointer`}
          id="4"
        />
      </div>
      <div
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseLeave}
        id="5"
        onClick={() => (handleRatingClick ? handleRatingClick(5) : () => {})}
      >
        <AiFillStar
          className={`${
            rat >= 5 ? "text-yellow-400" : ""
          } w-8 h-8 cursor-pointer`}
          id="5"
        />
      </div>
    </div>
  );
};

export default Stars;
