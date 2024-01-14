import React, { useContext, useEffect } from "react";

// importing bootstrap essentials
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
// import SearchbarNav from "../../CommonFeatures/components/SearchbarNav";
import { GiClothespin } from "react-icons/gi";
import { useSearch } from "../../User/context/searchContext";



// importing context work
import { logincontext } from "../../GlobalContext/context";

//importing compoenets

import LogoImage from "../../images/logo.jpg";
import AdPostingModal from "./AdPostingModal";

export default function Navigationbar() {
  const { state, dispatch } = useContext(logincontext);




// const [searchQuery, setSearchQuery] = useState("");
const { searchQuery, setSearchQuery } = useSearch();

const handleSearch = () => {
  // Implement your search logic here
  console.log("Searching for:", searchQuery);
  // You can now use the searchQuery to filter your data or perform other actions.
  setSearchQuery(searchQuery);
};


  return (
    <Navbar expand="lg"  style={{backgroundColor:'#fff8f4 '}} className="border-bottom fixed-top">
      <div className="container mx-5 py-1 rounded-pill" style={{backgroundColor:'#ffd7ba '}}>




        {/* LOGO */}

        
        <Link
            to="/"
            className=" text-decoration-none d-flex align-items-end mx-4 "
          >
            <GiClothespin size={35} color="black"/>
          
            <span className="fw-bold text-black mx-2" >Preloved Threads</span>
          </Link>
     
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">


          {/* SEARCHBAR */}
          {/* <SearchbarNav/> */}
        <Form className="d-flex align-items-center  mx-auto   focus:outline-none">
              <FormControl
                type="search"
                placeholder="Enter category here.."
                className="   py-2 rounded-pill focus:outline-none focus:border-red-300"
                // aria-label="Search"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                }}
              />
              <Button
                variant=""
                className="rounded-full text-wh font-bold hover:border-spacing-x-64 hover:bg-slate-600 hover:text-white focus:border-red-300"
                onClick={handleSearch}
              >
                Search
              </Button>
            </Form>




          {/* OTHER LINKS */}
          <Nav className="d-flex align-items-center ml-auto">
            

           
              
              <AdPostingModal/>
            
            <Link to="/Chatbot" className="nav-link font-bold font-size-2xl hover:text-gray-700  cursor-pointer">
                Chatbot
              </Link>
            
            <Link className="nav-link" to="/">
              <button
                className="btn btn-outline-dark "
                onClick={() => {
                  dispatch({
                    type: "LOGOUT",
                  });
                }}
              >
                SignOut
              </button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
