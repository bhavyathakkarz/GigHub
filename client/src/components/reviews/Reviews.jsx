import React, { useState } from "react";
import Review from "../review/Review";
import "./reviews.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { Audio } from "react-loader-spinner";

const Reviews = ({ gigId }) => {
  const [review, setReview] = useState({
    desc: "",
    star: 0,
  });

  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });
  const handleChange = (e) => {
    setReview((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const mutation = useMutation({
    mutationFn: (rev) => {
      return newRequest.post("/reviews/", rev);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { desc, star } = review;
    mutation.mutate({ gigId, desc, star });
    setReview((prev) => ({ ...prev, desc: "" }));
  };
  return (
    <div className="reviews">
      <h2>Reviews</h2>
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
        data.map((review) => <Review key={review._id} review={review} />)
      )}
      <div className="add">
        <h2>Add a Review</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="desc"
            placeholder="Write your opinion"
            onChange={handleChange}
          />
          <select name="star" id="star" onChange={handleChange}>
            <option value="1">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
