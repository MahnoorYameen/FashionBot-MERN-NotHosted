import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import AdBlockDynamic from "./AdBlockDynamic.jsx"
import { Row } from 'react-bootstrap'
import Col from 'react-bootstrap/Col';

export default function CategoryBlockDynamic() {
  const [Category, setCatgeory] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:1234/api/get-all-categories`)
      .then(json => setCatgeory(json.data.Categories))
      .catch(err => console.log(err))
  }, [])
  return (
    <>



    <h2 className='text-center my-3'>Recent Ads</h2>

{/* categories munwali and ab map krwa diya */}
        {
          Category?.map((value, index) =>
            <div key={index} className='container'>

              {/* ek heading ban gayi for each category  */}
              <h3 className=' my-2 text-capitalize'>{value.CategoryName}:</h3>

              {/* ab ek row banayi and is row main ads ayengy */}
              <div className="row">
             
                <AdBlockDynamic CategoryName={value.CategoryName} />
              
              </div>
            </div>

          )
        }



    </>
  )
}
