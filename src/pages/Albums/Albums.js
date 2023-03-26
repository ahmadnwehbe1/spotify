import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Albums.css";
import axios from "axios";
import AlbumCard from "../../components/AlbumCard/AlbumCard";

const Albums = () => {
  const { id } = useParams();
  const [albums, setAlbums] = useState([]);
  const [artist, setArtist] = useState({});
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/artists/${id}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setArtist(response.data);
      });
    axios
      .get(`https://api.spotify.com/v1/artists/${id}/albums`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        setAlbums(response.data.items);
      });
  }, [id, token]);

  return (
    <div className="albums-container">
      <h1>{artist.name}</h1>
      <h2>Albums</h2>
      {albums && albums.length > 0 && (
        <div className="all-albums">
          {albums.map((album, i) => (
            <AlbumCard key={i} album={album} artist={artist} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Albums;
