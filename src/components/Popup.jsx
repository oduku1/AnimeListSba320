import { useContext, useState,useEffect} from "react";
import { AuthContext } from "../context/AuthContext";

export default function Popup({ selectedAnime, onClose }) {
  if (!selectedAnime) return null; // safety check
  const { title, episodes, genres, images } = selectedAnime;
  const image = images?.jpg?.image_url;

  const [episodesWatched, setEpisodesWatched] = useState(0);
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setEpisodesWatched(0);
    setRating(0);
    setStatus(null);
  }, [selectedAnime]);

  const {user} = useContext(AuthContext)

  const handleSubmit = async (e)=>
  {
    e.preventDefault();
    try{
      const res = await axios.post("/api/users/:userId/anime",{ 

      })

    }
    catch(e){

    }
  }
  

  return (
    <div
      onClick={onClose} // close if clicking outside the popup box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside box
        style={{
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "90%",
          color: "black",
        }}
      >
        <h2>{selectedAnime.title}</h2>
        <img
          src={selectedAnime.images?.jpg?.image_url}
          alt={selectedAnime.title}
          style={{ width: "100%", height: "auto", borderRadius: "4px" }}
        />
        <p>Episodes: {selectedAnime.episodes || "N/A"}</p>
        <p>Status: {selectedAnime.status || "Unknown"}</p>
        {user}

        <button
          onClick={onClose}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
