import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingHome } from "./Loading Components/LoadingHome";
import { LoadingGenre } from "./Loading Components/LoadingGenre";
// axios.get(`https://api.jikan.moe/v4/manga/${id}`)
export const GenreItems = () => {
  const [genreItems, setGenreItems] = useState([]);
  const [filteredGenreItems, setFilteredGenreItems] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 20; // Number of items per page
  const { genre } = useParams();
  const [loading, setLoading] = useState(false);

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
          className="card card-side bg-base-100 shadow-xl mt-5 border-2 p-10"
          key={index}
        >
          <img
            src={genritem.images.jpg.large_image_url}
            alt={genritem.title}
            className="w-80 h-80 object-contain rounded-lg"
          />
          <div className="card-body">
            <h2 className="card-title">{genritem.title}</h2>
            <p className="mb-10">{genritem.synopsis}</p>
            <div className="font-semibold">
              {genritem.genres.length > 0 && (
                <p>Genre: {genritem.genres.map((g) => g.name).join(", ")}</p>
              )}
            </div>
            <div className="stars flex justify-start items-start font-semibold">
              {genritem.type}
            </div>
            <div className="stars flex justify-start items-start font-semibold">
              ⭐{genritem.score}
            </div>
            <div className="stars flex justify-start items-start font-semibold">
              {genritem.status}
            </div>
            <div className="stars flex justify-start items-start font-semibold">
              episodes: {genritem.episodes}
            </div>
            <div className="stars flex justify-start items-start font-semibold">
              {genritem.year}
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Watch</button>
            </div>
          </div>
        </div>
      ))}
      {loading && <LoadingGenre />}
    </>
  );
};
