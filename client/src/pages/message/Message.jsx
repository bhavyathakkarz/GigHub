import React from "react";
import "./message.scss";
import { Link } from "react-router-dom";

const Message = () => {
  return (
    <div className="message">
      <div className="container">
        <span className="breadcrums">
          <Link to="/messages" className="link">
            Messages
          </Link>{" "}
          | John Done |
        </span>
        <div className="messages">
          <div className="item">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              rerum, necessitatibus tempore quam tenetur dolorem earum hic
              doloribus quod quasi est fugit molestiae perferendis, ab minima
              laudantium sequi qui adipisci.
            </p>
          </div>
          <div className="item">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              rerum, necessitatibus tempore quam tenetur dolorem earum hic
              doloribus quod quasi est fugit molestiae perferendis, ab minima
              laudantium sequi qui adipisci.
            </p>
          </div>
          <div className="item">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              rerum, necessitatibus tempore quam tenetur dolorem earum hic
              doloribus quod quasi est fugit molestiae perferendis, ab minima
              laudantium sequi qui adipisci.
            </p>
          </div>
          <div className="item">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              rerum, necessitatibus tempore quam tenetur dolorem earum hic
              doloribus quod quasi est fugit molestiae perferendis, ab minima
              laudantium sequi qui adipisci.
            </p>
          </div>
          <div className="item">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              rerum, necessitatibus tempore quam tenetur dolorem earum hic
              doloribus quod quasi est fugit molestiae perferendis, ab minima
              laudantium sequi qui adipisci.
            </p>
          </div>
          <div className="item">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              rerum, necessitatibus tempore quam tenetur dolorem earum hic
              doloribus quod quasi est fugit molestiae perferendis, ab minima
              laudantium sequi qui adipisci.
            </p>
          </div>
          <div className="item">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              rerum, necessitatibus tempore quam tenetur dolorem earum hic
              doloribus quod quasi est fugit molestiae perferendis, ab minima
              laudantium sequi qui adipisci.
            </p>
          </div>

          <div className="item owner">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              rerum, necessitatibus tempore quam tenetur dolorem earum hic
              doloribus quod quasi est fugit molestiae perferendis, ab minima
              laudantium sequi qui adipisci.
            </p>
          </div>
          <div className="item owner">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              rerum, necessitatibus tempore quam tenetur dolorem earum hic
              doloribus quod quasi est fugit molestiae perferendis, ab minima
              laudantium sequi qui adipisci.
            </p>
          </div>
          <div className="item">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              rerum, necessitatibus tempore quam tenetur dolorem earum hic
              doloribus quod quasi est fugit molestiae perferendis, ab minima
              laudantium sequi qui adipisci.
            </p>
          </div>
          <div className="item owner">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              rerum, necessitatibus tempore quam tenetur dolorem earum hic
              doloribus quod quasi est fugit molestiae perferendis, ab minima
              laudantium sequi qui adipisci.
            </p>
          </div>
          <div className="item">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              rerum, necessitatibus tempore quam tenetur dolorem earum hic
              doloribus quod quasi est fugit molestiae perferendis, ab minima
              laudantium sequi qui adipisci.
            </p>
          </div>
          <div className="item">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              rerum, necessitatibus tempore quam tenetur dolorem earum hic
              doloribus quod quasi est fugit molestiae perferendis, ab minima
              laudantium sequi qui adipisci.
            </p>
          </div>
          <div className="item">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              rerum, necessitatibus tempore quam tenetur dolorem earum hic
              doloribus quod quasi est fugit molestiae perferendis, ab minima
              laudantium sequi qui adipisci.
            </p>
          </div>
          <div className="item">
            <img src="/img/man.png" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              rerum, necessitatibus tempore quam tenetur dolorem earum hic
              doloribus quod quasi est fugit molestiae perferendis, ab minima
              laudantium sequi qui adipisci.
            </p>
          </div>
        </div>
        <hr />
        <div className="write">
          <textarea
            cols="30"
            rows="10"
            placeholder="Write a Message"
          ></textarea>
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Message;
