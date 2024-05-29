import  { useEffect, useState, useRef, useCallback } from "react";
import { Card } from "./Card";
import { LoadingHome } from "./Loading Components/LoadingHome";
import axios from "axios";
import { SearchBarAnime } from "./SearchAnime";
import { useDarkMode } from "../context/DarkModeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface AnimeData {
  title_english:string;
  title_japanese:string;
  genres: { name: string }[];
  img: string;
  score: number;
  status: string;
  year: number;
  episodes: number;
  type: string;
  synopsis: string;
  trailer: string;
  isDark: boolean;
}
export const Home = () => {
  const [anime, setAnime] = useState<AnimeData[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { isDark } = useDarkMode();
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchAnime = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await axios.get<{ data: AnimeData[] }>(
        `https://api.jikan.moe/v4/top/anime?limit=20&page=${page}`
      );
      
      setAnime((prev) => [...prev, ...res.data.data]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error in fetching data", error);
      setIsLoading(false);
    }
  }, [page]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setPage(1); // Reset page when performing a search
  };

  useEffect(() => {
    if (searchQuery) {
      // Perform search when searchQuery changes
      const searchAnime = async () => {
        try {
          setIsLoading(true);
          const res = await axios.get<{ data: AnimeData[] }>(
            `https://api.jikan.moe/v4/anime?q=${searchQuery}`
          );          
          setAnime(res.data.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error in fetching search data", error);
          setIsLoading(false);
        }
      };
      searchAnime();
    } else {
      // Fetch top anime if no search query
      fetchAnime();
    }
  }, [searchQuery, fetchAnime]);

  const lastAnimeElementRef = useCallback(
    (node:any) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  // Show a toast message when the dark mode is enabled by default
  useEffect(() => {
    if (isDark) {
      toast.dark("Dark Mode turned on, because your 👀 deserves it", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [isDark]);

  console.log(anime);

  return (
    <>
      <SearchBarAnime onSearch={handleSearch} />
      <Card animeData={anime} lastAnimeElementRef={lastAnimeElementRef} isDark={isDark} />
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      )}
      <LoadingHome />
      <ToastContainer />
    </>
  );
};
