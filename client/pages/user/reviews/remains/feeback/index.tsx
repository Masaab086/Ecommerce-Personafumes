import { FC, MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { ReveiwModal } from "model/review.modal";
import { joiResolver } from "@hookform/resolvers/joi";
import { ReviewSchema } from "schemas/reviews.schema";
import Stars from "components/ratings/stars";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { toast } from "react-toastify";

interface FeedbackProps {
  showModal: boolean;
  setShowModal: Function;
  selectProduct: any;
  setOrders: Function;
  orders: Array<any>;
}

const Feedback: FC<FeedbackProps> = ({
  showModal,
  setShowModal,
  selectProduct,
  setOrders,
  orders,
}) => {
  const [rat, setRat] = useState<{ rating: Number; isRat: boolean }>({
    rating: 0,
    isRat: false,
  });

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ReveiwModal>({
    resolver: joiResolver(ReviewSchema, {
      errors: { wrap: { label: "" } },
      abortEarly: true,
    }),
  });

  const handleMouseHover = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    if (!rat.isRat) setRat({ ...rat, rating: Number(target.id) });
  };

  const handleRatingClick = (id: Number) => {
    setRat({ isRat: true, rating: id });
    setValue("rating", id);
  };

  const handleReviewSubmit = (postdata: ReveiwModal) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/order/review`, {
        ...postdata,
        orderProductId: selectProduct.orderProductId,
      })
      .then(({ data }) => {
        console.log(data);
        toast.success(data.message);
        setShowModal(false);
        setRat({ isRat: false, rating: 0 });
        setOrders(
          orders.map((order) => {
            const newOrderProduct = order.orderProducts.map((prod: any) =>
              prod.orderProductId === selectProduct.orderProductId
                ? { ...prod, isReviewed: 1, review: postdata }
                : prod
            );

            let isReviewd: boolean = true;

            newOrderProduct.forEach((prod: any) => {
              if (!prod.isReviewed) isReviewd = false;
            });

            return {
              ...order,
              orderProducts: newOrderProduct,
              reviewed: isReviewd ? 1 : 0,
              isBottleReview:
                selectProduct.orderId === order.orderId ? true : false,
            };
          })
        );
        reset();
      })
      .catch((err) => {
        toast.error(handleAxiosResponseError(err));
        console.log(handleAxiosResponseError(err));
      });
  };

  const handleMouseLeave = () => {
    if (!rat.isRat) setRat({ ...rat, rating: 0 });
  };

  return (
    <div
      className={`${
        !showModal && "hidden"
      } overflow-y-auto overflow-x-hidden fixed z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex justify-between items-start p-4 rounded-t border-b ">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
              data-modal-toggle="defaultModal"
              onClick={() => setShowModal(false)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="flex flex-col justify-center items-center p-4">
            <form onSubmit={handleSubmit(handleReviewSubmit)} className="w-5/6">
              <label> Rate Your Delivery</label>
              <Stars
                handleMouseHover={handleMouseHover}
                handleMouseLeave={handleMouseLeave}
                handleRatingClick={handleRatingClick}
                rat={rat.rating}
              />
              {errors.rating && (
                <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                  {errors.rating.message}
                </p>
              )}
              <div className="py-5">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Your message
                </label>
                <textarea
                  {...register("comment")}
                  rows={5}
                  className="block p-2.5 text-sm w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-yellow-600 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-white hover:text-black"
              >
                Publish Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
