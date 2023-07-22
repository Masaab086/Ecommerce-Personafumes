import Image from "next/image";
import { FC, useState } from "react";
import Feedback from "./feeback";

interface RemainsProps {
  orders: Array<any>;
  setOrders: Function;
  isLightTheme: boolean;
}

const Remains: FC<RemainsProps> = ({ orders, setOrders, isLightTheme }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectProduct, setSelectProduct] = useState({
    orderId: "",
    orderProductId: "",
  });

  const handleModal = (obj: any) => {
    setShowModal(true);

    setSelectProduct(obj);
  };

  return (
    <div className="h-[70vh] overflow-y-auto">
      {orders.map((order, key) => {
        if (order.reviewed) return <></>;

        return (
          <div
            className={`p-4 rounded mb-4 ${
              isLightTheme ? "bg-[#FFEDDF]" : "bg-gray-900"
            }`}
            key={key}
          >
            <h1
              className={` text-lg ${
                isLightTheme ? "text-[#865D4C]" : "text-gray-400"
              }`}
            >
              Purchased on {order.dateTime.split("T")[0]}
            </h1>
            <h4
              className={`text-sm ${
                isLightTheme ? "text-[#865D4C]" : "text-gray-200"
              }`}
            >
              Order Id : {order.orderId}
            </h4>

            {order.orderProducts.map((product: any, index: any) => {
              if (product.isReviewed) return <></>;

              return (
                <div
                  className="py-4 flex mt-2 justify-between border-t"
                  key={index}
                >
                  <div className="flex">
                    <div className="relative h-32 w-28">
                      <Image src={product.image} fill alt="bottle" />
                    </div>
                    <div className="px-4">
                      <h1
                        className={`text-base font-semibold py-2 ${
                          isLightTheme ? "text-[#865D4C]" : "text-gray-200"
                        }`}
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
                        Cost : Rs {product.totalCost}
                      </h5>
                    </div>
                  </div>
                  <div>
                    <button
                      className={`inline-flex items-center px-5 py-2.5 text-sm font-semibold text-center text-white  rounded-lg focus:ring-4 focus:ring-blue-200  ${
                        isLightTheme
                          ? "bg-[#865D4C]"
                          : "bg-yellow-600 hover:bg-white hover:text-black"
                      }`}
                      onClick={() =>
                        handleModal({
                          orderId: order.orderId,
                          orderProductId: product.orderProductId,
                        })
                      }
                    >
                      Give Feedback
                    </button>
                  </div>
                </div>
              );
            })}
            <h4
              className={`text-sm ${
                isLightTheme ? "text-[#865D4C]" : "text-gray-200"
              }`}
            >
              Order Cost: Rs {order.orderTotal}
            </h4>
          </div>
        );
      })}
      <Feedback
        showModal={showModal}
        setShowModal={setShowModal}
        selectProduct={selectProduct}
        setOrders={setOrders}
        orders={orders}
      />
    </div>
  );
};

export default Remains;
