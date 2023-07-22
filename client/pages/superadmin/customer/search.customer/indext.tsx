import { ChangeEvent, FC } from "react";

interface SearchCustomerProps {
  allCustomers: Array<any>;
  setCustomers: Function;
}

const SearchCustomer: FC<SearchCustomerProps> = ({
  allCustomers,
  setCustomers,
}) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilter = allCustomers.filter((value) => {
      return (
        value.firstName
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase()) ||
        value.lastName
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase()) ||
        value.userEmail
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase()) ||
        value.phone
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      );
    });

    if (e.target.value === "") setCustomers(allCustomers);
    else setCustomers(newFilter);
  };

  return (
    <div className="w-3/5">
      <input
        placeholder="Search by name/email/phone"
        className=" bg-transparent px-4 w-full py-1 border border-[#938E8E] rounded-md"
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchCustomer;
