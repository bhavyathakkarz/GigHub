import React from "react";
import "./review.scss";
import { useQuery } from "@tanstack/react-query";
import { Audio } from "react-loader-spinner";
import newRequest from "../../utils/newRequest";

const Review = ({ review }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = review?.userId;
  const { isLoading, error, data } = useQuery({
    queryKey: [`${userId}`],
    queryFn: () =>
      newRequest.get(`/user/${userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <>
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
        "Something went Wrong!!"
      ) : (
        <div className="review">
          <div className="user">
            <img src={data?.img || "/img/noavatar.jpg"} alt="" />
            <div className="info">
              <span>
                {currentUser?._id === data?._id ? "You" : data?.username}
              </span>
              <div className="country">
                <img src="/img/flag.png" alt="" />
                <span>{data?.country}</span>
              </div>
            </div>
          </div>
          {!isNaN(Math.round(review.star)) && (
            <div className="stars">
              {Array(Math.round(review.star))
                .fill("/img/star.png")
                .map((item, i) => (
                  <img src={item} key={i} alt="" />
                ))}
              <span>{Math.round(review.star)}</span>
            </div>
          )}
          <p>{review.desc}</p>
          <div className="helpful">
            <span>Helpful?</span>
            <img src="/img/like.png" alt="" />
            <span>Yes</span>
            <img src="/img/dislike.png" alt="" />
            <span>no</span>
          </div>
        </div>
      )}
      <hr />
    </>
  );
};

export default Review;
