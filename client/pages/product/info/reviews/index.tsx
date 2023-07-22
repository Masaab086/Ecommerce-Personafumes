import Stars from "components/ratings/stars";
import { Review } from "model/interfaces";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface ReviewsProps {
  className: string;
  reviews: Review[];
}

const Reviews: FC<ReviewsProps> = ({ className, reviews }) => {
  const [countStars, setCountStars] = useState<Array<Number>>([0, 0, 0, 0, 0]);
  const [aveStars, setAveStars] = useState(0);

  useEffect(() => {
    const counted = [0, 0, 0, 0, 0];
    reviews.map((review) => {
      if (Number(review.rating) === 5) counted[0] = counted[0] + 1;
      else if (Number(review.rating) === 4) counted[1] = counted[1] + 1;
      else if (Number(review.rating) === 3) counted[2] = counted[2] + 1;
      else if (Number(review.rating) === 2) counted[3] = counted[3] + 1;
      else if (Number(review.rating) === 1) counted[4] = counted[4] + 1;
    });

    setAveStars(
      (counted[0] * 5 +
        counted[1] * 4 +
        counted[2] * 3 +
        counted[3] * 2 +
        counted[4] * 1) /
        reviews.length
    );

    setCountStars((c) =>
      c.map((star, key) => (counted[key] * 100) / reviews.length)
    );
  }, [reviews]);

  return (
    <div className={`${className} mx-auto my-8 p-5 w-4/5`}>
      <div className="w-full">
        <div className="flex items-center mb-3 ">
          <Stars rat={aveStars} />
          <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
            {aveStars} out of 5
          </p>
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {reviews.length} global ratings
        </p>

        {countStars.map((star, key) => (
          <div className="flex items-center mt-4" key={key}>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
              {5 - key} star
            </span>
            <div className="mx-4 w-2/4 h-5 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className={`h-5 bg-yellow-400 rounded ${
                  star > 0 ? `w-[${star}%]` : "w-0"
                }`}
              ></div>
            </div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
              {`${star}%`}
            </span>
          </div>
        ))}

        {reviews.map((review, key) => (
          <article className="mt-10" key={key}>
            <div className="flex items-center mb-4 space-x-4">
              <div className="relative w-10 h-10 rounded-full border border-white overflow-hidden">
                <Image
                  src={
                    review.reviewedBy.customerImage
                      ? review.reviewedBy.customerImage
                      : "/images/blank.jpg"
                  }
                  fill
                  alt="user"
                />
              </div>

              <div className="space-y-1 font-medium dark:text-white">
                <p>{review.reviewedBy.customerName}</p>
              </div>
            </div>
            <div className="flex items-center mb-1">
              <Stars rat={review.rating} />
            </div>
            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
              <p>Reviewed on {review.dateTime.split("T")[0]}</p>
            </footer>
            <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
              {review.comment}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
