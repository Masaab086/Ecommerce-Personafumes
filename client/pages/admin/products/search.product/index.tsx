import { ChangeEvent, FC } from "react";

interface SearchProductProps {
  allProducts: Array<any>;
  setProducts: Function;
}

const SearchProduct: FC<SearchProductProps> = ({
  allProducts,
  setProducts,
}) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilter = allProducts.filter((value) => {
      return value.bottleName
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase());
    });

    if (e.target.value === "") setProducts(allProducts);
    else setProducts(newFilter);
  };

  return (
    <div className="w-3/5">
      <input
        placeholder="Search by bottle name"
        className=" bg-transparent px-4 w-full py-1 border border-[#938E8E] rounded-md"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchProduct;
