import { CardItem } from "./CardItem";
import { AnimeProps } from "./Home";

interface CardProps {
  animeData: AnimeProps[];
}

export const Card = ({ animeData }: CardProps) => {
    console.log(animeData)

  return (
    <>
      {animeData.map((anime, index) => {

        
       return (
        <CardItem
          key={index}
          title={anime.title}
          genres={anime.genres}
          img={anime.images.jpg.large_image_url}
          score={anime.score}
          status={anime.status}
          year={anime.year}
          episodes={anime.episodes}
          type={anime.type}
          synopsis={anime.synopsis}
        />
      )})}
    </>
  );
};