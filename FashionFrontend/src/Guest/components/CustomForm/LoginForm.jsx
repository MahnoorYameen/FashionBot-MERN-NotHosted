import React, { useState, useContext } from "react";
import axios from "axios";
import { logincontext } from "./../../../GlobalContext/context";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";


export default function LoginForm() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ContactNo, setContactNo] = useState("");

  const { state, dispatch } = useContext(logincontext);

  const login = (e) => {
    e.preventDefault();
    const payload = {
      Email: Email,
      Password: Password,
      ContactNo: ContactNo,
    };

    // console.log(payload)

    axios
      .post("http://localhost:1234/api/login", payload)
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
  };
  return (
    <>
              <div className="flip-card__front">
                <form onSubmit={login}>
                  
                <div className="title">Log in</div>

                   {/*EMAIL  */}
                    <input
                      type="email"
                      name="email"
                      className="flip-card__input my-3"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  

                  {/* Contact No */}
                    <input
                      type="ContactNo"
                      className="flip-card__input my-3"
                      id="exampleInputContactNo"
                      name="ContactNo"
                      placeholder="ContactNo"
                      value={ContactNo}
                      onChange={(e) => setContactNo(e.target.value)}
                    />
                   


                   {/* PASSWORD */}
                    <input
                      type="password"
                      className="flip-card__input my-3"
                      name="password"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                  <button
                    type="submit"
                    className="flip-card__btn"
                  >
                    Submit
                  </button>
                </form>
              </div>






    </>
  );
}
