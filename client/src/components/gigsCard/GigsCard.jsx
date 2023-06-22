import React from "react";
import "./gigsCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { Audio } from "react-loader-spinner";

const GigsCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [`${item.userId}`],
    queryFn: () =>
      newRequest.get(`/user/${item.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigsCard">
        <img src={item.cover} alt="" />
        <img src="./img/heart.png" alt="" className="heart" />
        <div className="details">
          {isLoading ? (
            <Audio
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="loading"
              // wrapperStyle
              // wrapperClass
            />
          ) : error ? (
            "Something went wrong!!"
          ) : (
            <div className="user">
              <img src={data.img || "./img/noavatar.jpg"} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.title}</p>
          <div className="ratings">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
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
