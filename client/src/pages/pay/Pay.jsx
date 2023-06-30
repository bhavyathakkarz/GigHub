import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useNavigate, useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutform/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE);
const currentUser = JSON.parse(localStorage.getItem("user"));

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    !currentUser && navigate("/login");
  }, [currentUser]);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, [id]);
  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
