import React, { useEffect, useState } from "react";
import "./register.scss";
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    currentUser && navigate("/");
  }, [currentUser]);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    phone: "",
    desc: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSeller = (e) => {
    setUser((prev) => ({ ...prev, isSeller: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(file);
    try {
      await newRequest.post("auth/register", {
        ...user,
        img: url,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a New Account</h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            onChange={handleChange}
          />
          <label htmlFor="img">Profile Picture</label>
          <input
            type="file"
            name="img"
            id="img"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="username">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            required
            onChange={handleChange}
          />
          <button>Register</button>
        </div>
        <div className="right">
          <h1>I want to become a seller</h1>
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="number"
            id="phone"
            name="phone"
            onChange={handleChange}
          />
          <label htmlFor="desc">Description</label>
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
          <span className="err">{error && error}</span>
          <div className="links">
            <span>Already have an account? </span>
            <Link className="link" to="/login">
              Log In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
