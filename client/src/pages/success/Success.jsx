import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
const Success = () => {
  const navigate = useNavigate();
  const { search } = useLocation(); //direct {key}
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent"); //query = location (search key) || params = useParams()
  const currentUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    !currentUser && navigate("/login");
  }, [currentUser]);
  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put(`/orders/`, { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);
  return (
    <div
      style={{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "24px",
        marginTop: "100px",
        marginBottom: "40px",
      }}
    >
      Payment Successful. You are being redirected to orders page. Please do not
      close the page.
    </div>
  );
};

export default Success;
