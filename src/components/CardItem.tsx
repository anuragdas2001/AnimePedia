import React from "react";
import { Link } from "react-router-dom";
interface CardItemProps {
  title: string;
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

export const CardItem = React.forwardRef<HTMLDivElement, CardItemProps>(
  (
    {
      title_english,
      title_japanese,
      genres,
      img,
      score,
      status,
      year,
      episodes,
      type,
      synopsis,
      trailer,
      isDark,
    },
    ref
  ) => {
    // console.log(trailer);
    console.log(isDark);
    console.log(title_english)
    return (
      <>
        <div
          ref={ref}
          className={`card h-80 card-side mb-2 p-3 transform transition-transform duration-300 covered-by-your-grace-regular ${
            isDark
              ? "bg-gradient-to-r from-gray-950 via-blue-950 text-white to-gray-950 hover:translate-y-[-5px] shadow-lg hover:shadow-2xl"
              : "bg-gradient-to-r from-gray-100 via-blue-300  to-gray-100 hover:translate-y-[-5px]  shadow-lg hover:shadow-2xl"
          }`}
        >
          <img
            src={img}
            alt={title_english}
            className="w-40 h-full object-fill rounded-md"
          />

          <div className="card-body -mt-8 flex flex-col justify-between">
            <div>
              <h2 className="card-title text-sm">{title_english}</h2>
              <p className="text-xs mb-4">{synopsis}</p>
              <div className="text-xs font-semibold">
                {genres.length > 0 && (
                  <p>Genre: {genres.map((g) => g.name).join(", ")}</p>
                )}
              </div>
              <div className="flex justify-start items-start text-xs font-semibold">
                {type}
              </div>
              <div className="flex justify-start items-start text-xs font-semibold">
                ⭐ {score}
              </div>
              <div className="flex justify-start items-start text-xs font-semibold">
                {status}
              </div>
              <div className="flex justify-start items-start text-xs font-semibold">
                Episodes: {episodes}
              </div> 
              <div className="flex justify-start items-start text-xs font-semibold">
                Japanese title: {title_japanese}
              </div>
              <div className="flex justify-start items-start text-xs font-semibold">
                {year}
              </div>
            </div>
            <div className="flex justify-end space-x-2 text-black">
              <button className=" h-10 w-auto bg-yellow-300 rounded-md text-sm p-2">
                Add to Favourites
              </button>
              <a href={trailer} target="_blank" rel="noopener noreferrer">
                <button className=" h-10 w-auto  bg-cyan-500 rounded-md text-sm p-2">
                  Watch Trailer
                </button>
              </a>
              {/* {console.log(title)} */}
              <Link to={`/StreamAnime/${title_japanese}/episode-${1}`}>
                <a href={trailer} target="_blank" rel="noopener noreferrer">
                  <button className=" h-10 w-auto  bg-lime-500 rounded-md text-sm p-2">
                    Watch Now
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
);
