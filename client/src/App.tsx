import "./App.css";
import Banner from "./components/Banner";
import PlaceCard from "./components/PlaceCard";
import QualityCard from "./components/QualityCard";
import WhyChooseUs from "./components/WhyChooseUs";
import UseDatabaseConn from "./hooks/useDatabaseConn";

function App() {
  const data = UseDatabaseConn();
  // if (data === null) console.log("data is empty");
  // else console.log(data);
  return (
    <>
      {/* <SignIn /> */}
      {/* <NavBar /> */}
      <Banner />
      <WhyChooseUs />
      <PlaceCard />
      {/* <Signup /> */}
    </>
  );
}

export default App;
