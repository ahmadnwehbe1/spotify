import React from "react";
import "./ArtistCard.css";

const ArtistCard = ({ artist }) => {
  const percentage = artist.popularity / 100;
  const filledStars = Math.round(percentage * 5);
  const emptyStars = 5 - filledStars;

  return (
    <div className="card">
      <div className="image">
        <img
          alt={artist.name}
          className="card-img"
          src={artist.images[0]?.url ? artist.images[0]?.url : "unknown.jpg"}
        />
      </div>
      <div className="info">
        <div className="name">{artist.name}</div>
        <div className="followers">
          {artist.followers.total.toLocaleString()} followers
        </div>
        <div className="stars">
          {[...Array(filledStars)].map((_, index) => (
            <i key={index} className="fa fa-star"></i>
          ))}
          {[...Array(emptyStars)].map((_, index) => (
            <i key={index} className="fa fa-star-o"></i>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
