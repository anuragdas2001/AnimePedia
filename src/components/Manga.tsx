import axios from "axios";
import { useEffect, useState } from "react";
import { MangaItems } from "./MangaItems";
import { LoadingHome } from "./Loading Components/LoadingHome";

export const Manga = () => {
  const [manga, setManga] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchManga = async () => {
      if (loading) return;
      setLoading(true);
      try {
        const mangaData = await axios.get(`https://api.jikan.moe/v4/manga`, {
          params: { page },
        });
        setManga((prevManga) => [...prevManga, ...mangaData.data.data]);
        if (mangaData.data.data.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error in Fetching Manga Data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchManga();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading ||
        !hasMore
      ) {
        return;
      }
      setPage((prevPage) => prevPage + 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <>
      {manga.map((m:any, index) => (
        <MangaItems
          key={index}
          title={m.title}
          genres={m.genres}
          img={m.images.jpg.large_image_url}
          score={m.score}
          status={m.status}
          year={m.year}
          episodes={m.episodes}
          type={m.type}
          synopsis={m.synopsis}
        />
      ))}
      {loading && <LoadingHome />}
    </>
  );
};
