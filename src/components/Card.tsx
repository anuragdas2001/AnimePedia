import { CardItem } from "./CardItem";
// import { AnimeProps } from "./Home";

interface CardProps {
  animeData: [];
  lastAnimeElementRef: (node: HTMLElement | null) => void;
  isDark: boolean;
}

export const Card = ({ animeData, lastAnimeElementRef, isDark }: CardProps) => {
  console.log(animeData);
  return (
    <>
      {animeData.map((anime, index) => {
        console.log("English", anime.title_english);
        if (animeData.length === index + 1) {
          return (
            <CardItem
              ref={lastAnimeElementRef}
              key={index}
              title_english={anime.title_english}
              title_japanese={anime.title}
              genres={anime.genres}
              img={anime.images.jpg.large_image_url}
              score={anime.score}
              status={anime.status}
              year={anime.year}
              episodes={anime.episodes}
              type={anime.type}
              synopsis={anime.synopsis}
              trailer={anime.trailer.url}
              isDark={isDark}
            />
          );
        } else {
          return (
            <CardItem
              key={index}
              title_english={anime.title_english}
              title_japanese={anime.title}
              genres={anime.genres}
              img={anime.images.jpg.large_image_url}
              score={anime.score}
              status={anime.status}
              year={anime.year}
              episodes={anime.episodes}
              type={anime.type}
              synopsis={anime.synopsis}
              trailer={anime.trailer.url}
              isDark={isDark}
            />
          );
        }
      })}
    </>
  );
};
