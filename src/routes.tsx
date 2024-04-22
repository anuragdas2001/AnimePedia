import { createBrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Genre } from "./components/Genre";
import { Top } from "./components/Top";
import { Recommendation } from "./components/Recommendation";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/genre", element: <Genre /> },
      { path: "/top", element: <Top /> },
      { path: "/recommendations", element: <Recommendation /> },
    ],
  },
  //   { path: "/genre", element: <Genre /> },
]);
