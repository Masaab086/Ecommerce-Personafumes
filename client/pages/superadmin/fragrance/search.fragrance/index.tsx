import { ChangeEvent, FC } from "react";

interface SearchProductProps {
  allFragrance: Array<any>;
  setFragrances: Function;
}

const SearchFragrance: FC<SearchProductProps> = ({
  allFragrance,
  setFragrances,
}) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilter = allFragrance.filter((value) => {
      return value.fragranceName
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase());
    });

    if (e.target.value === "") setFragrances(allFragrance);
    else setFragrances(newFilter);
  };

  return (
    <div className="w-3/5">
      <input
        placeholder="Search by Fragrance name"
        className=" bg-transparent px-4 w-full py-1 border border-[#938E8E] rounded-md"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchFragrance;
