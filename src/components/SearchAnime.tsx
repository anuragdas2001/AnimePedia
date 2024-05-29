import { useState } from "react";

export const SearchBarAnime = ({ onSearch }: any) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: any) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-center">
      <input
        type="text"
        placeholder="Explore a world of stories. Search for anime"
        value={query}
        onChange={handleChange}
        className="border border-gray-300 w-11/12 covered-by-your-grace-regular rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit">
        <img className="h-14 w-14 p-4" src="/public/search.png" alt="" />
      </button>
    </form>
  );
};
