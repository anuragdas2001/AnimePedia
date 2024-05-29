import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import { LoadingGenre } from "./Loading Components/LoadingGenre";
// axios.get(`https://api.jikan.moe/v4/manga/${id}`)
export const GenreItems = () => {
  const [genreItems, setGenreItems] = useState([]);
  const [filteredGenreItems, setFilteredGenreItems] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 20; // Number of items per page
  const { genre } = useParams();
  const [loading, setLoading] = useState(false);
  const { isDark } = useDarkMode();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const offset = (page - 1) * perPage;

        // Fetch data from both anime APIs
        const requests = [];
        for (let id = offset + 1; id <= offset + perPage; id++) {
          requests.push(axios.get(`https://api.jikan.moe/v4/anime/${id}`));
        }

        const responses = await Promise.allSettled(requests);

        const fetchedItems = responses
          .filter((response) => response.status === "fulfilled")
          .map((response) => response.value.data.data);

        setGenreItems((prevItems) => [...prevItems, ...fetchedItems]);
        setLoading(false);
      } catch (error) {
        console.error("Error in fetching data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page, genre]);

  useEffect(() => {
    if (genreItems.length > 0) {
      const filteredItems = genreItems.filter((item) =>
        item.genres.some((g) => g.name.toLowerCase() === genre.toLowerCase())
      );
      setFilteredGenreItems(filteredItems);
    }
  }, [genre, genreItems]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {filteredGenreItems.map((genritem, index) => (
        <div
          key={index}
          className={`card h-80 card-side mb-2 mt-5 p-3 transform transition-transform duration-300 covered-by-your-grace-regular ${
            isDark
              ? "bg-gradient-to-r from-gray-950 via-blue-950 text-white to-gray-950 hover:translate-y-[-5px] shadow-lg hover:shadow-2xl"
              : "bg-gradient-to-r from-gray-100 via-blue-300 to-gray-100 hover:translate-y-[-5px] shadow-lg hover:shadow-2xl"
          }`}
        >
          <img
            src={genritem.images.jpg.large_image_url}
            alt={genritem.title}
            className="w-40 h-full object-fill rounded-md"
          />
          <div className="card-body -mt-8 flex flex-col justify-between">
            <div>
              <h2 className="card-title text-sm">{genritem.title}</h2>
              <p className="text-xs mb-4">{genritem.synopsis}</p>
              <div className="text-xs font-semibold">
                {genritem.genres.length > 0 && (
                  <p>Genre: {genritem.genres.map((g) => g.name).join(", ")}</p>
                )}
              </div>
              <div className="flex justify-start items-start text-xs font-semibold">
                {genritem.type}
              </div>
              <div className="flex justify-start items-start text-xs font-semibold">
                ⭐ {genritem.score}
              </div>
              <div className="flex justify-start items-start text-xs font-semibold">
                {genritem.status}
              </div>
              <div className="flex justify-start items-start text-xs font-semibold">
                Episodes: {genritem.episodes}
              </div>
              <div className="flex justify-start items-start text-xs font-semibold">
                {genritem.year}
              </div>
            </div>
            <div className="flex justify-end space-x-2 text-black">
              <button className="h-10 w-auto bg-yellow-300 rounded-md text-sm p-2">
                Add to Favourites
              </button>
              <a
                href={genritem.trailer}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="h-10 w-auto bg-cyan-500 rounded-md text-sm p-2">
                  Watch Trailer
                </button>
              </a>
              <Link to={`/StreamAnime/${genritem.title}/episode-${1}`}>
                <button className="h-10 w-auto bg-lime-500 rounded-md text-sm p-2">
                  Watch Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      {loading && <LoadingGenre />}
    </>
  );
};
