import { createBrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Genre } from "./components/Genre";
import { GenreItems } from "./components/GenreItem";
import { Recommendation } from "./components/Recommendation";
import { Manga } from "./components/Manga";
import { Registration } from "./components/Registration";
import { SplashScreen } from "./components/SplashScreen";
import { Login } from "./components/Login";
import { StreamAnime } from "./components/StreamAnime";
import { Favourite } from "./components/Favourites";
export const router = createBrowserRouter([
  { path: "/", element: <SplashScreen /> },
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/genre", element: <Genre /> },
      { path: "/genreItems/:genre", element: <GenreItems /> },
      { path: "/Manga", element: <Manga /> },
      { path: "/Favourites", element: <Favourite /> },
    ],
  },
  { path: "/registration", element: <Registration /> },
  { path: "/login", element: <Login /> },
  // { path: "/Splash", element: <SplashScreen/> },
  { path: "/StreamAnime/:anime/:episode", element: <StreamAnime /> },
]);
