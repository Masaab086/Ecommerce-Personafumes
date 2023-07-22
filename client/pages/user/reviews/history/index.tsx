import Stars from "components/ratings/stars";
import Image from "next/image";
import { FC } from "react";

interface HistoryProps {
  orders: Array<any>;
  isLightTheme: boolean;
}

const History: FC<HistoryProps> = ({ orders, isLightTheme }) => {
  return (
    <div className="h-[70vh] overflow-y-auto">
      {orders.map((order, key) => {
        if (order.reviewed || order.isBottleReview)
          return (
            <div
              className={`p-4 rounded ${
                isLightTheme ? "bg-[#FDF3EB]" : "bg-gray-900"
              }`}
              key={key}
            >
              <h1
                className={`text-lg ${
                  isLightTheme ? "text-[#865D4C]" : "text-gray-400"
                }`}
              >
                Purchased on {order.dateTime.split("T")[0]}
              </h1>
              <h4
                className={`text-sm ${
                  isLightTheme ? "text-[#865D4C]" : "text-gray-400"
                }`}
              >
                Order Id : {order.orderId}
              </h4>
              <label className="text-xs font-medium">
                Your product rating & review:
              </label>
              {order.orderProducts.map((product: any, index: any) => {
                if (product.isReviewed === 1)
                  return (
                    <div className="py-2 flex justify-between" key={index}>
                      <div className="flex">
                        <div className="relative h-32 w-20">
                          <Image src={product.image} fill alt="bottle" />
                        </div>
                        <div className="px-4">
                          <h1
                            className={`text-base font-semibold ${
                              isLightTheme ? "text-[#865D4C]" : "text-gray-300"
                            } py-2`}
                          >
                            {product.inspiration}
                          </h1>
                          <h3
                            className={`text-xs ${
                              isLightTheme ? "text-[#865D4C]" : "text-gray-300"
                            }`}
                          >
                            Fragrance : {product.fragranceName}
                          </h3>
                          <h5
                            className={`text-xs ${
                              isLightTheme ? "text-[#865D4C]" : "text-gray-300"
                            }`}
                          >
                            Bottle : {product.bottleName}
                          </h5>
                          <h5
                            className={`text-xs ${
                              isLightTheme ? "text-[#865D4C]" : "text-gray-300"
                            }`}
                          >
                            Quantity : {product.quantity}
                          </h5>
                          <h5
                            className={`text-xs ${
                              isLightTheme ? "text-[#865D4C]" : "text-gray-300"
                            }`}
                          >
                            Weight : {product.weight}
                          </h5>
                          <h5
                            className={`text-xs ${
                              isLightTheme ? "text-[#865D4C]" : "text-gray-300"
                            }`}
                          >
                            Cost : {product.totalCost}
                          </h5>
                        </div>
                      </div>
                      <div className="py-2 px-5">
                        <Stars rat={product.review.rating} />
                      </div>

                      <div
                        className={`py-2 px-5 rounded w-2/6 ${
                          isLightTheme ? "bg-[#FFEDDF]" : "bg-gray-700"
                        }`}
                      >
                        <p>{product.review.comment}</p>
                      </div>
                    </div>
                  );
                else return <></>;
              })}
              <label className="text-xs font-medium">
                Order Cost : {order.orderTotal}
              </label>
            </div>
          );
        else return <></>;
      })}
    </div>
  );
};

export default History;
