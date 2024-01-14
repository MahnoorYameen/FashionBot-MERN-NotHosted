import React, { useEffect, useContext } from "react";

// react k icons use kr rhi
import { HiOutlineHome } from "react-icons/hi";
import { BiSolidCategory } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

// context lagayengy
import { logincontext } from "../../GlobalContext/context";

export default function () {
  //For hover active effect
  const location = useLocation();

  // using our context
  const { state, dispatch } = useContext(logincontext);

  //correct way of navbar
  const NavItems = [
    {
      tab: "All Categories",
      url: "/category",
      icon: <BiSolidCategory style={{ color: "black" }} />,
    },
    {
      tab: "All Ads",
      url: "/AllAds",
      icon: <BiSolidCategory style={{ color: "black" }} />,
    },
  ];

  return (
    <>
      <div className=" d-flex justify-content-between align-items-center p-3  ">
        <span className="text-dark px-2">Admin Dashboard</span>
        <button
          className="btn text-dark btn-outline-dark"
          onClick={() => {
            dispatch({
              type: "LOGOUT",
            });
          }}
        >
          Logout
        </button>
      </div>

      <ul className="nav flex-column">
        {NavItems.map(
          (
            val,
            index //curly bracket + backtick = expression
          ) => (
            <li
              className={`nav-item my-1 mx-2 ${
                location.pathname == val.url ? "bg-light rounded" : null
              }`}
              key={index}
            >
              <Link
                to={val.url}
                className="nav-link d-flex align-items-center gap-2"
              >
                <span>{val.icon}</span>
                {val.tab}
              </Link>
            </li>
          )
        )}
      </ul>
    </>
  );
}
