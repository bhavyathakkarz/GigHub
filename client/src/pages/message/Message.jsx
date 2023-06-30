import React, { useEffect } from "react";
import "./message.scss";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { Audio } from "react-loader-spinner";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const queryClient = useQueryClient();

  useEffect(() => {
    !currentUser && navigate("/login");
  }, [currentUser]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const {
    isLoading: conversationIsLoading,
    error: conversationError,
    data: conversationData,
  } = useQuery({
    queryKey: [`${id}`],
    queryFn: () =>
      newRequest.get(`/conversations/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  // console.log(conversationData?.buyerId);

  const userId = currentUser?.isSeller
    ? conversationData?.buyerId
    : conversationData?.sellerId;
  console.log(userId);

  const {
    isLoading: userIsLoading,
    error: userError,
    data: userData,
  } = useQuery({
    queryKey: [`${userId}`],
    queryFn: () =>
      newRequest.get(`/user/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      newRequest.post("/messages/", message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrums">
          <Link to="/messages" className="link">
            Messages
          </Link>{" "}
          |{" "}
          {conversationIsLoading ? (
            <Audio
              height="10"
              width="10"
              radius="9"
              color="green"
              ariaLabel="loading"
              // wrapperStyle
              // wrapperClass
            />
          ) : conversationError ? (
            "Something went Wrong!!"
          ) : currentUser?.isSeller ? (
            conversationData.buyerName
          ) : (
            conversationData.sellerName
          )}{" "}
          |
        </span>
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
          <div className="messages">
            {data.map((m) => (
              <div
                key={m._id}
                className={
                  currentUser?._id === m.userId ? "item owner" : "item"
                }
              >
                <img
                  src={
                    currentUser?._id === m.userId
                      ? currentUser.img || "/img/noavatar.jpg"
                      : userIsLoading
                      ? "loading"
                      : userError
                      ? "error"
                      : userData.img || "/img/noavatar.jpg"
                  }
                  alt=""
                />
                <p>{m?.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea
            cols="30"
            rows="10"
            placeholder="Write a Message"
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
