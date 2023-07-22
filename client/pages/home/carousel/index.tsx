import Card from "components/Card";
import { useRouter } from "next/router";
import { FC } from "react";

// Data
interface CarouselProps {
  products: Array<any>;
}
const Carousel: FC<CarouselProps> = ({ products }) => {
  const router = useRouter();
  return (
    <div className="w-full mx-auto flex justify-center">
      {/* <div className="flex justify-between absolute top left w-full h-full">
          <button
            onClick={movePrev}
            className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled("prev")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled("next")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div> */}
      <div className="flex scrollbar-thin scrollbar-thumb-gray-700 overflow-x-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        {products.map((card, key) => {
          return (
            <div
              key={key}
              className="w-96"
              style={{ minWidth: "20rem" }}
              onClick={() =>
                router.push(
                  `/product/${
                    card.bottleId
                  }?type=${card.categoryType.toLowerCase()}`
                )
              }
            >
              <Card card={card} />
            </div>
          );
        })}
      </div>
      {/* <div className="flex justify-center overflow-x-auto mx-auto ">
        {products.map((card, key) => {
          return (
            <Link
              href={`/product/${
                card.bottleId
              }?type=${card.categoryType.toLowerCase()}`}
              key={key}
            >
              <a className="min-w-fit w-96">
                <Card card={card} />
              </a>
            </Link>
          );
        })}
      </div> */}
    </div>
  );
};

export default Carousel;
