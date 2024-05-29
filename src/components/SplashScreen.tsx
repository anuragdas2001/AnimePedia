import { TextGenerateEffect } from "./ui/text-generate-effect";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const SplashScreen = () => {
  const words1 = `Animepedia`;
  const words2 = `For anime lovers by anime lovers`;
  const navigate = useNavigate();
    useEffect(() => {
      setTimeout(() => {
        navigate("/registration");
      }, 3000);
    }, []);

  return (
    <>
      <div>
        <div>
          <div className="absolute top-0 right-0 ">
            <img
              src="[removal.ai]_39e30eb5-a3c7-4236-b25e-6c034500c862-358582_FF8X4J.png"
              alt=""
              className=" w-11/12"
            />
          </div>
          {/* <div>
          <img src="/public/346005_prev_ui.png" alt="" />
        </div>
        <div>
          <img src="/public/Remove-bg.ai_1716302423231.png" alt="" />
        </div> */}
        </div>
        <div className="flex justify-start m-10 ">
          <TextGenerateEffect
            className="covered-by-your-grace-regular"
            words={words1}
            textcolor={"text-yellow-400"}
            textsize={"text-6xl"}
          />
        </div>
        <div className="flex justify-start mt-40 ml-20 ">
          <TextGenerateEffect
            className="covered-by-your-grace-regular "
            words={words2}
            textcolor={"text-white"}
            textsize={"text-5xl"}
          />
        </div>
        <div className="absolute bottom-0 flex items-center justify-center w-full transform translate-x-0">
          <span>Made with</span>
          <img
            src="https://img.icons8.com/?size=100&id=19411&format=png&color=000000"
            className="h-8 w-8 mx-2"
            alt="love icon"
          />
          <span>by Anurag Das</span>
        </div>
      </div>
    </>
  );
};
