import { Link, Navigate,useNavigate } from "react-router-dom";
import Search from "./SearchBar";

export default function NavBar({ onSearch, setQuery, query,loggedIn ,setLoggedIn,setUser}) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    navigate("/");
  };
    return (
      <nav className="nav">
        <div className="nav-left">
          <Link to="/">Home</Link>
          <Link to="/discover">Discover</Link>
          {loggedIn && <Link to="/profile">Profile</Link>}
        </div>
  
        <div className="nav-right">
          <Search onSearch={onSearch} query={query} setQuery={setQuery} />
          {loggedIn ? (
          <button onClick={handleLogout} className="login-btn">
            Logout
          </button>
        ) : (
          <button onClick={() => navigate("/login")} className="login-btn">
            Login
          </button>
        )}
        </div>
      </nav>
    );
  }