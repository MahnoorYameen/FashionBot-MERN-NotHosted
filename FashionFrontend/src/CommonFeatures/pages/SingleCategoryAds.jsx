import React, { useContext, useEffect, useState, } from 'react'
import { json, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import axios from 'axios'
import Banner from '../components/Banner'
import Footer from '../components/Footer'


export default function SingleCategoryAds() {

  const { CategoryName } = useParams()

  const [Ad, setAd] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:1234/api/get-ad-by-AdCategory?AdCategory=${CategoryName}`)
      .then(json => {
        setAd(json?.data?.AdByAdCategory)
        console.log(json.data.AdByAdCategory)

      })
      .catch(err => console.log(err.response.data))
  }, [])

  return (
    <>  
<Banner/>


    <div className="row container">

    
     {Ad.map((value, index) => (
        <div className="col-lg-3 col-md-4 col-sm-6 my-3" key={index}>
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
      </div>
      
      <Footer/>
      
      </>
  )
}
