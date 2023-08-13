import { BsSearch } from "react-icons/bs";
import { useGetAllProductsQuery } from "../utils/productApi";

const Search = ({ setInputKeyword, inputKeyword }) => {
  const handleSearch = () => {
    if (inputKeyword === "") {
      return;
    }
    console.log(inputKeyword);
  };
  return (
    <div className="mb-5 flex">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setInputKeyword(e.target.value);
        }}
        value={inputKeyword}
        className="border border-gray-300 py-1 px-4 rounded-l-sm outline-0"
      />
      <button
        onClick={() => handleSearch()}
        className="border-r border-t border-b border-gray-300 py-1 px-4 rounded-r-sm"
      >
        <BsSearch className="text-purple-800" />
      </button>
    </div>
  );
};

export default Search;
