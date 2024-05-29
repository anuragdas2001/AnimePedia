import { useEffect, useState } from "react";
import { auth } from "../Firebase/FirebaseInit.ts";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const Registration = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [register, setRegister] = useState<boolean>(false);
  const [time, setTime] = useState<number>(3);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (register) {
        if (time > 0) {
          setTime(time - 1);
        } else {
          navigate("/login");
        }
      }
    }, 1000); // Run every second
    // Clear the timer when the component unmounts or when time changes
    return () => clearTimeout(timer);
  }, [register, time]);

  const handleRegister = (event: any, email: string, password: string) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        console.log(auth);
        console.log(email);
        console.log(password);
        const user = userCredential.user;
        console.log(user);
        if (!register) {
          setRegister(true);
        }
        // navigate("/login");
        // ...
      })
      // .catch(() => {
      //   //If already registered then redirect to login page
      //   navigate("/login");
      // })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
          setRegister(true);
        }
        console.log(errorMessage);
      });
  };

  return (
    <>
      {/* <div className="w-full flex justify-center mt-16">
        <img
          src="https://media.giphy.com/media/RfSEtAibkFAGiVVYX0/giphy.gif"
          className="absolute w-32 h-32 ml-96 rounded-full"
          alt="Centered Image"
        ></img>
      </div> */}
      <div className="w-full ml-14">
        <img
          src="https://media.giphy.com/media/Lpi3F7hFedErKjGvvC/giphy.gif"
          className="absolute  w-40 h-40"
          title="Giphy Embed"
        ></img>
      </div>
      <div className="absolute h-40 w-40 ">
        <img
          src="https://media.giphy.com/media/Cl7AO1UBNr9WwY3F7I/giphy.gif"
          className="absolute ml-32 mt-72 top-0 left-0 w-32 h-32"
          title="Giphy Embed"
        ></img>
      </div>
      <h1 className="covered-by-your-grace-regular text-center text-3xl font-bold mb-10 mt-32 ">
        Registration
      </h1>

      <div className="flex justify-center mt-10 covered-by-your-grace-regular">
        <form className="w-full max-w-xs">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="bg-slate-100 dark:bg-slate-700 dark:text-white rounded-xl p-3 w-full mb-3"
            />
          </div>
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
            onClick={(event) => handleRegister(event, email, password)}
            type="submit"
            className="bg-blue-500 text-white rounded-xl p-3 w-full hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="text-center">
        {register && <p>Account already exists try to login</p>}
      </div>
      <div className="text-center">
        {register && <p>Redirecting to login page in {time} seconds.</p>}
      </div>

      {/* <div className="w-40 h-40">
        <iframe
          src="https://giphy.com/embed/9Jb0K4r143JTLDynH6"
          className="absolute top-32  left-0 w-40 h-40"
          frameBorder="0"
          allowFullScreen
          title="Giphy Embed"
        ></iframe>
      </div> */}

      {/* <div className="absolute top-0  w-full">
        <img
          src="https://media.giphy.com/media/gh620EMUy2usC9cfjb/giphy.gif"
          className="absolute ml-96 mt-16 w-32 h-32"
          frameBorder="0"
          allowFullScreen
          title="Giphy Embed"
        ></img>
      </div> */}
      {/* <div className="absolute top-32 right-0 w-40 h-40">
        <img
          src="https://media.giphy.com/media/Su24EeLFHWH8ob1luY/giphy.gif"
          className="absolute top-0 left-0 w-40 h-40"
          title="Giphy Embed"
        ></img>
      </div> */}

      <div className="ml-96 pl-32 -mt-96">
        <img
          src="https://media.giphy.com/media/MZ7yrimhG3DThJqHjl/giphy.gif"
          className="absolute ml-80 w-60 h-96"
          title="Giphy Embed"
        ></img>
      </div>

      {/* <div className="absolute top-0  right-0 w-full">
      <iframe
        src="https://giphy.com/embed/KezaX9YihJixXCorRL"
        className="absolute ml-96 mt-32 w-32 h-32"
        frameBorder="0"
        allowFullScreen
        title="Giphy Embed"
      ></iframe>
    </div> */}
    </>
  );
};
