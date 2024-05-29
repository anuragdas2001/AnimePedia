export const LoadingHome = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-40 h-40">
        <img
          src="https://media.giphy.com/media/fX2tHgGgfzMOD12DRo/giphy.gif"
          className="absolute inset-0 w-full h-full"
          alt="Loading Animation"
          style={{ backgroundColor: "transparent" }}
        />
      </div>
    </div>
  );
};
