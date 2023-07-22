import { ChangeEvent, FC } from "react";

interface SearchOrderProps {
  allOrders: Array<any>;
  setOrders: Function;
}

const SearchOrder: FC<SearchOrderProps> = ({ allOrders, setOrders }) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilter = allOrders.filter((value) => {
      return (
        value.shippingAddress
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase()) ||
        value.orderTotal.includes(e.target.value)
      );
    });

    if (e.target.value === "") setOrders(allOrders);
    else setOrders(newFilter);
  };

  return (
    <div className="w-3/5">
      <input
        placeholder="Search by Customer Name / Bottle Name"
        className=" bg-transparent px-4 w-full py-1 border border-[#938E8E] rounded-md"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchOrder;
