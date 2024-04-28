import { useEffect, useState } from "react";
import { Card } from "./Card";
import axios from "axios";

export interface AnimeProps {
  title: string;
  genre: string;
  images: { jpg: { image_url: string } };
  score: number;
  status: string;
  year: number;
  episodes: number;
  type: string;
  synopsis: string;
}

interface AnimeData {
  data: AnimeProps[];
}

export const Home = () => {
  const [anime, setAnime] = useState<AnimeData | null>(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.get<AnimeData>("https://api.jikan.moe/v4/top/anime?limit=20");
        setAnime(res.data);
      } catch (error) {
        console.error("Error in fetching data", error);
      }
    };
    fetchAnime();
  }, []);

  return (
    <>
      <h1>Home!</h1>
      {anime && <Card animeData={anime.data} />}
    </>
  );
};