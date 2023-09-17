import { BsSearch } from "react-icons/bs";
import { useGetAllProductsQuery } from "../utils/productApi";

const Search = ({ setInputKeyword, inputKeyword }) => {
  return (
    <div className="mb-5 flex ">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setInputKeyword(e.target.value);
        }}
        value={inputKeyword}
        className="border-b border-l border-t rounded-l-md border-gray-300 py-1 px-1  outline-0 w-8/12"
      />

      <button
        // onClick={() => handleSearch()}
        className="border-r border-t border-b rounded-r-md border-gray-300 py-1 px-4 "
      >
        <BsSearch className="text-gray-600" />
      </button>
    </div>
  );
};

export default Search;
