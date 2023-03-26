import React from "react";
import { Link } from "react-router-dom";
import "./AlbumCard.css";

const AlbumCard = ({ album, artist }) => {
  return (
    <Link
      style={{ color: "black", textDecoration: "none" }}
      to={album.external_urls.spotify}
    >
      <div
        className="card"
        //   onClick={() => {
        //     navigate(`/${artist.id}/albums`);
        //   }}
      >
        <div className="image">
          <img
            alt={album.name}
            className="card-img"
            src={album.images[0]?.url ? album.images[0]?.url : "unknown.jpg"}
          />
        </div>
        <div className="info">
          <div className="name">{album.name}</div>
          <div className="followers">{artist.name}</div>
          <div className="date-tracks">
            <div className="date">{album.release_date}</div>
            <div className="date">{album.total_tracks} tracks</div>
          </div>
        </div>
        <button className="preview">Preview on Spotify</button>
      </div>
    </Link>
  );
};

export default AlbumCard;
