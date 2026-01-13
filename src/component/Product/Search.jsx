import { BsSearch } from "react-icons/bs";

const Search = ({ setInputKeyword, inputKeyword }) => {
  return (
    <form className="mb-5 flex" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="searchInput" className="sr-only">
        Search
      </label>
      <input
        id="searchInput"
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setInputKeyword(e.target.value);
        }}
        value={inputKeyword}
        className="border-b border-l border-t rounded-l-md border-gray-300 py-1 px-1 outline-0 w-8/12"
      />

      <button
        aria-label="Search"
        type="submit"
        className="border-r border-t border-b rounded-r-md border-gray-300 py-1 px-4"
      >
        <BsSearch className="text-gray-600" />
      </button>
    </form>
  );
};

export default Search;
