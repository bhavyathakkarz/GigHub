import React, { useEffect } from "react";
import "./myGigs.scss";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { Audio } from "react-loader-spinner";

const MyGigs = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const queryClient = useQueryClient();
  useEffect(() => {
    !currentUser && navigate("/login");
  }, [currentUser]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser?._id}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };
  return (
    <div className="myGigs">
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
        <div className="container">
          <div className="title">
            <h1>Gigs</h1>
            <Link className="link" to="/add">
              <button>Add New Gig</button>
            </Link>
          </div>
          <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            {data.map((item) => (
              <tr>
                <td>
                  <img className="img" src={item.cover} alt="" />
                </td>
                <td>{item.title}</td>
                <td>&#8377;{item.price}</td>
                <td>{item.sales}</td>
                <td>
                  <img
                    className="delete"
                    src="/img/delete.png"
                    alt=""
                    onClick={() => handleDelete(item._id)}
                  />
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default MyGigs;
