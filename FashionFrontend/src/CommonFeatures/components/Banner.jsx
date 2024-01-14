import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import img1 from "./../../images/0.jpg"
import { Link } from 'react-router-dom';
export default function Banner() {
  return (
    <>
    
    
    <Carousel data-bs-theme="dark" className=''>

{/* first image */}
      <Carousel.Item >


      <Carousel.Caption className='d-flex flex-row-reverse ' style={{marginBottom: '150px', marginRight: '150px'}}>
          <Link to="/chatbot" className='text-decoration-none'>
          <h1 style={{ color: "black" }}>AI Chatbot</h1>

          <p style={{ color: "black" }}>Use Our Chatbot for Assistance</p>
          </Link>
        </Carousel.Caption >
        <img
          className="d-block w-100"
          src="https://www.shutterstock.com/image-photo/banner-laptop-mug-coffee-credit-260nw-1805989006.jpg"
          alt="First slide"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
       
      </Carousel.Item>


{/* second image */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img1}
          alt="Second slide"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
        {/* <Carousel.Caption>
          <h2 style={{ color: "black" }}>Online Shopping</h2>
          <p style={{ color: "black" }}>Browse and shop from the comfort of your home.</p>
        </Carousel.Caption> */}
      </Carousel.Item>


      {/* th */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://marketplace.canva.com/EAFYElY5EE4/1/0/1600w/canva-brown-and-white-modern-fashion-banner-landscape-Ap8IU9nEbh8.jpg"
          alt="Third slide"
          style={{ maxHeight: "500px", objectFit: "cover" }}
        />
        {/* <Carousel.Caption>
          <h2 style={{ color: "black" }}>Fashion Trends</h2>
          <p style={{ color: "black" }}>Stay updated with the latest fashion trends.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
    
    
    
    </>
  )
}
