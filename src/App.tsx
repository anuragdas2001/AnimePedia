
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { DarkModeProvider } from "./context/DarkModeContext.js";
 const App = () => {

  return(
    <>
    <DarkModeProvider>
      <RouterProvider router={router}/>
      </DarkModeProvider>
    </>
  )
};
export default App;