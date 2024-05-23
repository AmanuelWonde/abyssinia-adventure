import "./App.css";
<<<<<<< HEAD
import Banner from "./components/Banner";
import PlaceCard from "./components/PlaceCard";
import QualityCard from "./components/QualityCard";
import WhyChooseUs from "./components/WhyChooseUs";
import UseDatabaseConn from "./hooks/useDatabaseConn";
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostPlace from "./pages/PostPlace";
import PlacesList from "./pages/PlacesList";
>>>>>>> 3cbb8a6687456ad173aff02756ad051e69474c07

function App() {
  return (
<<<<<<< HEAD
    <>
      {/* <SignIn /> */}
      {/* <NavBar /> */}
      <Banner />
      <WhyChooseUs />
      <PlaceCard />
      {/* <Signup /> */}
    </>
=======
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post-place" element={<PostPlace />} />
        <Route path="/get-places" element={<PlacesList />} />
      </Routes>
    </Router>
>>>>>>> 3cbb8a6687456ad173aff02756ad051e69474c07
  );
}

export default App;
export default App;
