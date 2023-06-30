import React from "react";
import "./gig.scss";
import { Slider } from "infinite-react-carousel";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { Audio } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews";

const Gig = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: [`${id}`],
    queryFn: () =>
      newRequest.get(`gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });
  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: [`${userId}`],
    queryFn: () =>
      newRequest.get(`/user/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });
  return (
    <div className="gig">
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
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">fiverr | {data.cat} </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              <Audio
                height="30"
                width="30"
                radius="9"
                color="green"
                ariaLabel="loading"
                // wrapperStyle
                // wrapperClass
              />
            ) : errorUser ? (
              "Something went Wrong!!"
            ) : (
              <div className="user">
                <img
                  src={dataUser.img || "/img/noavatar.jpg"}
                  alt=""
                  className="pp"
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill("/img/star.png")
                      .map((item, i) => (
                        <img src={item} key={i} alt="" />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => (
                <img src={img} alt="" key={img} />
              ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            <div className="seller">
              <h2>About The Seller</h2>
              {isLoadingUser ? (
                <Audio
                  height="30"
                  width="30"
                  radius="9"
                  color="green"
                  ariaLabel="loading"
                  // wrapperStyle
                  // wrapperClass
                />
              ) : errorUser ? (
                "Something went Wrong!!"
              ) : (
                <div className="user">
                  <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(Math.round(data.totalStars / data.starNumber)) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill("/img/star.png")
                          .map((item, i) => (
                            <img src={item} alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
              )}
              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">From</span>
                    <span className="desc">{dataUser?.country}</span>
                  </div>
                  <div className="item">
                    <span className="title">Members since</span>
                    <span className="desc">Aug 2022</span>
                  </div>
                  <div className="item">
                    <span className="title">Avg. response time</span>
                    <span className="desc">4 hours</span>
                  </div>
                  <div className="item">
                    <span className="title">Last delivery</span>
                    <span className="desc">1 day</span>
                  </div>
                  <div className="item">
                    <span className="title">Languages</span>
                    <span className="desc">English</span>
                  </div>
                </div>
                <hr />
                <p>{data.shortDesc}</p>
              </div>
            </div>
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>&#8377;{data.price}</h2>
            </div>
            <p>
              I will create a unique high quality AI generated image based on a
              description that you give me.
            </p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>
                  {data.deliveryTime} {data.deliveryTime === 1 ? "day" : "days"}{" "}
                  Delivery
                </span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link className="link" to={`/pay/${id}`}>
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gig;
