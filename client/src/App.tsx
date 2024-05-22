import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SignIn from "./components/auth/SignIn";
import Signup from "./components/auth/Signup";
import UseDatabaseConn from "./hooks/useDatabaseConn";

function App() {
  const data = UseDatabaseConn();
  // if (data === null) console.log("data is empty");
  // else console.log(data);
  return (
    <>
      {/* <SignIn /> */}
      <Signup />
    </>
  );
}

export default App;
