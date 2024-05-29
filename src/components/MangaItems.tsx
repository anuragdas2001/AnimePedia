import React from "react";
interface MangaItemsProps {
  title: string;
  genres: { name: string }[];
  img: string;
  score: number;
  status: string;
  year: number;
  episodes: number;
  type: string;
  synopsis: string;
}

export const MangaItems = React.forwardRef<HTMLDivElement, MangaItemsProps>(
  (
    { title, genres, img, score, status, year, episodes, type, synopsis },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="card card-side bg-base-100 shadow-xl mt-5 border-2 p-10"
      >
        <img
          src={img}
          alt={title}
          className="w-80 h-full object-fill rounded-lg"
        />

        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="mb-10">{synopsis}</p>
          <div className="font-semibold">
            {genres.length > 0 && (
              <p>Genre : {genres.map((g) => g.name).join(", ")}</p>
            )}
          </div>
          <div className="stars flex justify-start items-start font-semibold">
            {type}
          </div>
          <div className="stars flex justify-start items-start font-semibold">
            ⭐{score}
          </div>
          <div className="stars flex justify-start items-start font-semibold">
            {status}
          </div>
          <div className="stars flex justify-start items-start font-semibold">
            Episodes: {episodes}
          </div>
          <div className="stars flex justify-start items-start font-semibold">
            {year}
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Watch</button>
          </div>
        </div>
      </div>
    );
  }
);
