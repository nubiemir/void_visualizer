import SearchIcon from "../../assets/search.svg";

const Search = () => {
  return (
    <div class="w-[100%]">
      <div class="w-[100%] bg-white rounded-md flex items-center relative px-2">
        <div>
          <img src={SearchIcon} width={30} height={30} />
        </div>
        <input
          type="text"
          class="w-[100%] py-3 focus:outline-none mx-3"
          placeholder="Search all algorithms and data structures"
        />
        <button class="h-[100%] bg-blue-600 px-6 py-1 rounded-md text-white text-lg">
          Go
        </button>
      </div>
    </div>
  );
};

export default Search;
