import { createContext, useState, useEffect, useRef} from "react";
import getData from "../api_fetching/jikan";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userAnime, setUserAnime] = useState([])
  const [results, setResults] = useState([]);
  const queriedAnime = useRef(null)
  const [dark, setDark] = useState(localStorage.getItem("theme") || "light");


  // Fetch top anime on startup
  useEffect(() => {
    async function fetchTopAnime() {
      setLoading(true);
      const data = await getData();
      setAnime(data);
      setLoading(false);
    }
    fetchTopAnime();
  }, []);

  /* useEffect(()=>{
    if (user){
    async function getUserData(){
    setLoading(true)
      user_anime = await Anime.find(a => a.userId === user.id)
      setUserAnime(user_anime)
      setLoadingFalse
    }
      getUserData()
    
    }
      else return; 
    

  },[user])*/

  useEffect(() => {
    const body = document.body;

    // remove both themes first
    body.classList.remove("light", "dark");

    // then apply the selected theme
    body.classList.add(dark);

    // save preference
    localStorage.setItem("theme", dark);
  }, [dark]);

  const value = {
    user,
    setUser,
    loggedIn,
    setLoggedIn,
    anime,
    setAnime,
    loading,
    setLoading,
    dark,
    setDark,
    results,
    setResults,
    queriedAnime
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}