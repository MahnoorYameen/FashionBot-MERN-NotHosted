import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'


export default function AdBlockDynamic({ CategoryName }) {
  const [Ad, setAd] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:1234/api/get-ad-by-AdCategory?AdCategory=${CategoryName}`)
      .then(json => {
        setAd(json.data.AdByAdCategory)
        // console.log(json.data.AdByAdCategory)

      })
      .catch(err => console.log(err.response.data))
  }, [])

  useEffect(() => {
    AOS.init({
      offset: 300,
      duration: 500
    });
  
  },[])
  return (
    <>

      {/* category name se match krty huay ads mungwany hain   */}

      {Ad.map((value, index) => (
        <div className="col-lg-3 col-md-4 col-sm-6 my-3" key={index} data-aos="fade-up" data-aos-duration="500">
          <Link className='text-decoration-none text-dark' to={`/get-ad-by-id/${value._id}`} >
            <Card style={{ height: "360px" }}>
              <Card.Img varient="top" src={value.AdThumbnail} className='object-fit-contain border rounded img-fluid' style={{ height: "200px" }} />
              <Card.Body>
                <div className="brand text-center">
                </div>

                <div className="brand text-center">
                  <span>Category:  </span>
                  <span className="fw-semibold">{value.AdCategory.length > 15 ? value.AdCategory.slice(0, 15) + '...' : value.AdCategory}</span>
                </div>




                <div className="text-center">
                  {value.AdName.length > 20 ? value.AdName.slice(0, 20) + '...' : value.AdName}
                </div>

                <div className='text-center' >
                  <h5 className='text-danger fw-semibold  me-2 text-secondary'>${value.AdPrice}</h5>

                </div>


              </Card.Body>


              {/* uper wala red badge */}
              <span className="position-absolute translate-start badge bg-danger" style={{
                padding: '5px 10px',
                marginTop: '10px',
                marginLeft: '-4px',
                borderRadius: '4px'
              }}>
                {value.AdCategory.toUpperCase()}
              </span>


            </Card>
          </Link>

         



          
        </div>
      ))}











    </>
  )
}
