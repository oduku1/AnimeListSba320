import React, { useState, useEffect, useRef } from "react";
import { searchAnime } from "../api_fetching/jikan";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      const data = await searchAnime(query);
      setResults(data.slice(0, 6)); // show up to 6 results
      setShowDropdown(true);
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(animeTitle) {
    navigate(`/anime/${encodeURIComponent(animeTitle)}`);
    setShowDropdown(false);
    setQuery("");
  }

  // ✅ NEW: handle pressing Enter
  function handleKeyDown(e) {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      navigate(`/discover/${encodeURIComponent(query.trim())}`);
      setShowDropdown(false);
      setQuery("");
    }
  }

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      <input
        type="text"
        placeholder="Search anime..."
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query && setShowDropdown(true)}
        onKeyDown={handleKeyDown} // 👈 listens for Enter key
      />

      {showDropdown && results.length > 0 && (
        <ul className="search-dropdown">
          {results.map((anime) => (
            <li
              key={anime.mal_id}
              onClick={() => handleSelect(anime.title)}
              className="dropdown-item"
            >
              <img
                src={anime.images?.jpg?.image_url}
                alt={anime.title}
                width="40"
                height="55"
                style={{ marginRight: "10px", borderRadius: "4px" }}
              />
              {anime.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}