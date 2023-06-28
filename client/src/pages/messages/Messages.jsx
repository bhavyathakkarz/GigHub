import React from "react";
import "./messages.scss";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { Audio } from "react-loader-spinner";
import moment from "moment";

const Messages = () => {
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get("/conversations/").then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });
  const handleRead = (id) => {
    mutation.mutate(id);
  };
  // const message =
  //   "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Perspiciatis deserunt pariatur cum illum eligendi sapiente asperiores dolore tenetur sed odit.";
  return (
    <div className="messages">
      <div className="container">
        <div className="title">
          <h1>Messages</h1>
        </div>
        <table>
          <tbody>
            {/* <thead> */}
            <tr>
              <th>{currentUser?.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {/* </thead>
          <tbody> */}
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
              data.map((c) => (
                <tr
                  className={
                    ((currentUser?.isSeller && !c.readBySeller) ||
                      (!currentUser?.isSeller && !c.readByBuyer)) &&
                    "active"
                  }
                  key={c.id}
                >
                  <td>{currentUser?.isSeller ? c.buyerName : c.sellerName}</td>
                  <td>
                    <Link className="link" to="/message/123">
                      {c?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(c.updatedAt).fromNow()}</td>
                  <td>
                    {((currentUser?.isSeller && !c.readBySeller) ||
                      (!currentUser?.isSeller && !c.readByBuyer)) && (
                      <button onClick={() => handleRead(c.id)}>
                        Mark as Read
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
