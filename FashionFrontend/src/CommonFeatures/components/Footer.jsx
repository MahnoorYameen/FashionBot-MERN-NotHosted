import React from "react";
import LogoImage from "../../images/logo.jpg";
import { GiClothespin } from "react-icons/gi";
import { Link } from "react-router-dom";
// import css from '../pages/user.css'

export default function Footer() {
  return (
    <>
      <footer className=" border-l-green-950 text-dark" style={{backgroundColor:'#ffd7ba '}}>
        <hr className="border-t border-gray-300 my-6" />

        {/* SECTION 1 */}
        <section >
          <div className="container pt-3 mt-2">
          <div className="row">
            {/* ROW COL 1 */}
            <div className="col-12 col-sm-12 col-md-3 col-lg-4 col-xl-4 d-flex flex-column align-items-center justify-content-center mb-4">
              <Link to="/" className=" fw-bold d-flex align-items-end text-decoration-none">
                <GiClothespin size={35} color="black" />

                <span className="mt-2 mx-2 fw-bold text-black">
                  Preloved Threads
                </span>
              </Link>
              <div className="d-flex ">
                {/* Social Media Icons */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  fill="currentColor"
                  className="bi bi-globe ms-1 me-1"
                  viewBox="0 0 16 16"
                >
                  <path d="#" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  fill="currentColor"
                  className="bi bi-google ms-1 me-1"
                  viewBox="0 0 16 16"
                >
                  <path d="#" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  fill="currentColor"
                  className="bi bi-pinterest ms-1 me-1 color-white cursor-pointer"
                  viewBox="0 0 16 16"
                >
                  <path d="#" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  fill="currentColor"
                  className="bi bi-skype ms-1 me-1"
                  viewBox="0 0 16 16"
                >
                  <path d="#" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                  height={25}
                  fill="currentColor"
                  className="bi bi-youtube ms-1 me-1"
                  viewBox="0 0 16 16"
                >
                  <path d="#" />
                </svg>
              </div>
            <hr />
            </div>

            {/* ROW COL 2 */}
            <div className="text-black col-0 col-sm-6 col-md-3 col-lg-4 col-xl-4 ">
              <h3 className="text-lg font-bold my-3">Support:</h3>
              {/* Support Links */}
              <p className="my-0">
                
                <Link to="contactus" className="text-decoration-none text-dark">
                Contact Us
                </Link>
              </p>
              <p className="my-0">
                <a href="register" className="text-decoration-none text-black">
                  Become Partner
                </a>
              </p>
              <p className="my-0">
                <a href="/register" className="text-decoration-none text-black">
                  Locate a Dealer
                </a>
              </p>
              <p className="my-0">
                <a href="/login" className="text-decoration-none text-black">
                  Product Registration
                </a>
              </p>
              <p className="my-0">
                <a href="/contactus" className="text-decoration-none text-black">
                  Complaints
                </a>
              
              </p>
              <p className="my-0">
                <a href="#" className="text-decoration-none text-black">
                  Future Updates
                </a>
              </p>
            </div>

            {/* ROW COL 3 */}
            <div className="col-0 col-sm-6 col-md-3 col-lg-4 col-xl-4">
              <h3 className="text-lg font-bold my-3">Clothing Marketplace</h3>
              {/* cloth Links */}
              <p className="my-0">
                <a href="#" className="text-decoration-none text-black">
                  FAQ
                </a>
              </p>
              <p className="my-0">
                <a href="#" className="text-decoration-none text-black">
                  Our Mission
                </a>
              </p>
              <p className="my-0">
                <a href="#" className="text-decoration-none text-black">
                  History
                </a>
              </p>
              <p>
                <a href="#" className="text-decoration-none text-black">
                  Terms &amp; Policy
                </a>
              </p>
              {/* Address */}
              <p className="my-0 fw-bold">Address:</p>
              <address className="text-sm">
                Disney Toy Mills Ltd. Plot No.HH-79, Landhi Industrial Area,
                Landhi, Karachi, Pakistan.
              </address>
            </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="py-1" style={{backgroundColor:'#f6bd94'}}>
          <div className="text-center ">
            <p className="text-sm ">All Rights Reserved</p>
          </div>
        </section>
      </footer>
    </>
  );
}
