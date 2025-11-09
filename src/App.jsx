import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import AnimePage from "./pages/AnimePage.jsx";
import NavBar from "./components/NavBar.jsx";
import { useEffect, useState } from "react";
import SingleAnime from "./pages/SingleAnime.jsx";
import getData,{searchAnime} from "./api_fetching/jikan.js";

function App() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user,setUser] = useState(null)
  const [loggedIn,setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTopAnime() {
      setLoading(true);
      const data = await getData();
      setAnime(data);
      setLoading(false);
    }
    fetchTopAnime();
  }, []);

  // 🔍 Global search handler (used by the NavBar Search)
  async function handleSearch(query) {
    if (!query) return;
    setLoading(true);
    const data = await searchAnime(query);
    setAnime(data);
    setLoading(false);
    navigate("/discover"); // ✅ Move user to Discover page
  }

  return (
    <>
      <NavBar onSearch={handleSearch} loggedIn={loggedIn} user={user} setLoggedIn={setLoggedIn} setUser={setUser}/>
      <Routes>
        <Route path ="/discover/:anime" element={<AnimePage/>}/>
        <Route path="/" element={<Home anime={anime} loading={loading} />} />
        <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} setUser={setUser}/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile/:user" element={<Profile/>}/>
        <Route path = "/anime/:anime" element={<SingleAnime/>}/>
      </Routes>
    </>
  );
}
export default App; 