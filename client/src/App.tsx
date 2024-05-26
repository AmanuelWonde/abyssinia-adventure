import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostPlace from "./pages/PostPlace";
import PlacesList from "./pages/PlacesList";
import SignIn from "./components/auth/SignIn";
import Signup from "./components/auth/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-place" element={<PostPlace />} />
        <Route path="/get-places" element={<PlacesList />} />
        <Route path="/auth/login" element={<SignIn />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
