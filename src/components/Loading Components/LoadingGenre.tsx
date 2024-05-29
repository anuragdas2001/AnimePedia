export const LoadingGenre = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-40 h-40 md:w-48 md:h-48">
        <img
          src="https://media.giphy.com/media/shpIYfSrJ5d9wqrumG/giphy.gif"
          width="100%"
          height="100%"
          className="absolute inset-0"
          frameBorder="0"
          allowFullScreen
          title="Loading Animation"
        ></img>
      </div>
    </div>
  );
};
