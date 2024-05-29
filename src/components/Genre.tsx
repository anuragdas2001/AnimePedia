import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { LoadingHome } from "./Loading Components/LoadingHome";
// Define the type for genre
interface GenreType {
  mal_id: number;
  name: string;
  count: number;
}

export const Genre = () => {
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        // Simulate loading with setTimeout
        setTimeout(async () => {
          const GenreData = await axios.get(
            `https://api.jikan.moe/v4/genres/anime`
          );
          setGenres(GenreData.data.data);
          setIsLoading(false); // Set loading to false after data is fetched
        }, 3000); // Simulate 3 seconds delay
      } catch (error) {
        console.error("Error in fetching data", error);
        setIsLoading(false); // Set loading to false on error
      }
    };

    fetchGenre();
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingHome />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 m-10 rounded-lg">
          {genres.map((genr, index: number) => (
            <Link key={index} to={`/genreItems/${genr.name}`}>
              <div className="flex flex-col h-40 w-40 border-2 border-orange-500 rounded-lg">
                <h1 className="flex justify-center mt-10">{genr.name}</h1>
                <br />
                <div className="flex justify-center">Count: {genr.count}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
