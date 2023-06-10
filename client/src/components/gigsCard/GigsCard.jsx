import React from "react";
import "./gigsCard.scss";
import { Link } from "react-router-dom";

const GigsCard = ({ item }) => {
  return (
    <Link to="/gig/123" className="link">
      <div className="gigsCard">
        <img src={item.img} alt="" />
        <img src="./img/heart.png" alt="" className="heart" />
        <div className="details">
          <div className="user">
            <img src={item.pp} alt="" />
            <span>{item.username}</span>
          </div>
          <p>{item.desc}</p>
          <div className="ratings">
            <img src="./img/star.png" alt="" />
            <span>{item.star}</span>
          </div>
          <div className="price">
            <span>From </span>
            <div className="amount">
              &#8377;
              {item.price}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigsCard;
