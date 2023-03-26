import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifyToken } from "../../services";
import "./Artists.css";
import axios from "axios";
import ArtistCard from "../../components/ArtistCard/ArtistCard";

const Artists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [artists, setArtists] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const token = localStorage.getItem("accessToken");

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${searchTerm}&type=artist&limit=20`,
      { headers: { Authorization: "Bearer " + token } }
    );
    setArtists(response.data.artists.items);
    setNextUrl(response.data.artists.next);
  };

  const handleLoadMore = async () => {
    const response = await axios.get(nextUrl, {
      headers: { Authorization: "Bearer " + token },
    });
    setArtists([...artists, ...response.data.artists.items]);
    setNextUrl(response.data.artists.next);
  };

  const navigate = useNavigate();
  const checkAuth = useCallback(async () => {
    const storageToken = localStorage.getItem("accessToken");
    const auth = await verifyToken(storageToken);
    if (!auth) {
      navigate("/login");
    }
  }, [navigate]);

  const handleArtistClick = (artistId) => {
    navigate("/albums", { state: { searchResults: artists } });
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <div
      className={
        artists.length > 0 ? "artist-container-result" : "artist-container"
      }
    >
      <form onSubmit={handleSearch} style={{ display: "contents" }}>
        <div className="input">
          <input
            placeholder="Search for an artist"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </form>
      {artists && artists.length > 0 && (
        <div className="all-artists">
          {artists.map((artist, i) => (
            <Link
              key={artist.id}
              to={`/${artist.id}/albums`}
              state={{ artists }}
            >
              <ArtistCard key={i} artist={artist} />
            </Link>
          ))}
          {nextUrl && (
            <button
              onClick={handleLoadMore}
              handleArtistClick={handleArtistClick}
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Artists;
