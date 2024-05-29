import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/FirebaseInit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleLogin = (event: any, email: string, password: string) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        console.log(auth);
        if (user) {
          navigate("/home");
        }
        // ...
      })
      .catch(() => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  };

  return (
    <>
      <div className="absolute">
        <img
          src="/public/Remove-bg.ai_1716302423231.png"
          className="h-52"
          alt=""
        />
      </div>
      <div className="absolute right-0">
        <img
          src="/public/sololeveling-removebg.png"
          className="h-80 w-full"
          alt=""
        />
      </div>
      <h1 className="covered-by-your-grace-regular text-center text-3xl font-bold mb-10 mt-32 ">
        Login
      </h1>
      <div className="flex justify-center mt-10 covered-by-your-grace-regular ">
        <form className="w-full max-w-xs">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="bg-slate-100 dark:bg-slate-700 dark:text-white rounded-xl p-3 w-full mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="bg-slate-100 dark:bg-slate-700 dark:text-white rounded-xl p-3 w-full mb-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            onClick={(event) => handleLogin(event, email, password)}
            type="submit"
            className="bg-blue-500 text-white rounded-xl p-3 w-full hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
