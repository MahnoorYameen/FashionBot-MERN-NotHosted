import axios from "axios";
import { logincontext } from "../../../GlobalContext/context";
import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";


export default function RegisterFormUser() {
  //for form
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ContactNo, setContactNo] = useState("");

  const { state, dispatch } = useContext(logincontext);


  const SignupUser = (e) => {
    e.preventDefault();
    const payload = { Email, Password, Username, ContactNo };

    axios
      .post("http://localhost:1234/api/register", payload)
      .then((json) => {
        const payload2={
          Email: json.data.user.Email,
          Password: Password,
      ContactNo:json.data.user.ContactNo,
        }
        console.log("payload2", payload2)

        axios
        .post("http://localhost:1234/api/login", payload2)
        .then((loginsuccess) => {
          Cookies.set("token", loginsuccess.data.token); //cookies main token ki value api se jo arahi wo set krdi
          dispatch({
            type: "LOGIN_USER",
            person: loginsuccess.data.token, //dipqtch ki ha token ki value
          });
        })
        .catch((error) => {
          console.log(error.meesage);
        });


        Swal.fire({
          title: "Account Created",
          text: "Thank you for Opening Account",
          confirmButtonText: "Continue ",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>


      <div className="flip-card__back">

        <div className="title">Register</div>

        <form className="flip-card__form" onSubmit={SignupUser}>


          {/* USERNAME */}
          <input
            className="flip-card__input"
            placeholder="Name"
            type="name"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* EMAIl */}
          <input
            className="flip-card__input"
            name="email"
            placeholder="Email"
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />


          {/* contact number */}

          <input
            className="flip-card__input"
            name="ContactNo"
            placeholder="ContactNo"
            type="ContactNo"
            value={ContactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />


          {/* Password */}
          <input
            className="flip-card__input"
            name="password"
            placeholder="Password"
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* button */}
          <button className="flip-card__btn" onClick={SignupUser}>Let's Shop</button>
        </form>
      </div>






    </>

  );
}
