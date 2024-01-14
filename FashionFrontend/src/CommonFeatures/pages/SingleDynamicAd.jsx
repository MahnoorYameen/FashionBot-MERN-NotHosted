import React, { useContext, useEffect, useState, } from 'react'
import { json, useParams } from 'react-router-dom'
import axios from 'axios';
import ReactStars from 'react-stars'
import Swal from 'sweetalert2';
import ImageSection from '../components/ImageSection';
import { Link } from 'react-router-dom';
import { logincontext } from '../../GlobalContext/context';
import { decodeToken } from 'react-jwt'




export default function SingleDynamicAd() {

  const { state, dispatch } = useContext(logincontext)
  // console.log("main hun token", state.person)
  
  const decodeUser = (token) => {
    if (!token) {
      return undefined;
    } else {
      const res = decodeToken(token);
      return res?.Username;
    }
  };
  const user = decodeUser(state.person)
// console.log(user, "titipapa")
  const { _id } = useParams()
  const [Ad, setAd] = useState(null)
  const [review, setreview] = useState("")
  const [rating, setrating] = useState(0)
  const [loader, setloader] = useState(true)

//   const [Quantity, setQuantity] = useState(1)


// //   const { cart_state, cart_dispatch } = useContext(Cartcontext)

  useEffect(() => {
    axios.get(`http://localhost:1234/api/get-ad-by-id?_id=${_id}`)
      .then((json) => {
        setAd(json.data.AdById)
        console.log("useeffect", json.data.AdById)

      })
      .catch((err) => console.log(err))
  }, [_id])

  const ratingChanged = (newRating) => setrating(newRating)


  const submitReview = () => {
    const payload = {
      _id: Ad._id,
      rating,
      username: user,
      review
    }

    axios.post('http://localhost:1234/api/review-ad', payload)
      .then(json => {
        const totalRating = json.data.Ad.reviews.reduce((accumulator, review) => accumulator + review.rating, 0);
        const averageRating = (totalRating / json.data.Ad.reviews.length).toFixed(1);

        const UpdateAdPayload = {
          _id: Ad._id,
          rating: averageRating
        }

        

        axios.put('http://localhost:1234/api/update-ad', UpdateAdPayload).then((json) => {


          const updatedAd = json.data.AdUpdate?.find(item => item._id === Ad._id);
          console.log("biryani",json.data)
          setAd(updatedAd);

          Swal.fire({
            title: 'Sucessfully Submitted!',
            text: 'Thanks for reviewing this Ad',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          setreview('')
          setrating(0)
        })
          .catch((err) => console.log(err))
      })
      .catch(err => console.log(err))
  

    }

  
    
  return (
    <>
       {
         
          <div className="container">
      
            <div className="row mt-5">
              <div className="col-md-6 ">
                {
                  Ad?.AdImageArray?.length > 0 && <ImageSection images={Ad.AdImageArray} />
                }
              </div>

              <div className="col-md-5 ">
                <div className="container">
                  <div>
                    <h1>{Ad?.AdName} </h1>
                    


                    <div className='d-flex'>
                      <span className='text-danger'>Category:  <span className='text-dark'></span></span>
                      <div style={{ borderLeft: "2px solid #dc3545", height: "20px" }} className='mt-1 mx-2 '></div>
                      <span className='text-danger'> {Ad?.AdCategory} <span className='text-dark'></span></span>
                   </div>
                  </div>

                  <div className="text-danger mt-2 ">
                    <h3>Rs: {Ad?.AdPrice}</h3>
                  </div>
                  <div className='d-flex'>
                      <span className='text-danger'>Location:  <span className='text-dark'></span></span>
                      <div style={{ borderLeft: "2px solid #dc3545", height: "20px" }} className='mt-1 mx-2 '></div>
                      <span className='text-danger text-capitalize'> {Ad?.AdLocation} <span className='text-dark'></span></span>
                   </div>

                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      edit={false}
                      value={Ad?.rating}
                      color2={'#ffd700'} />
                  </div> 
                  <h2 className='text-Dark mt-3'>Description: </h2>
                    <p className='text-secondary'> {Ad?.AdDescription}</p>
          

                  
                  </div> 
                  </div> 

               </div> 

              <div className='mt-5 text-center'>
              <h2>Review us</h2>
              <p className='text-secondary'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam doloribus ut</p>
            </div>  

              <div>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: 100 }}
                  defaultValue={review}
                  onChange={(e) => setreview(e.target.value)}
                />
                <label htmlFor="floatingTextarea2">Comments</label>
              </div>
            </div>  

             <div className="mt-3">
              Rate Us:
              <div className="d-flex align-items-center">
                <ReactStars
                  count={5}
                  size={24}
                  onChange={ratingChanged}
                  value={rating}
                  color2={'#ffd700'} />

                <div className='ms-3'>({rating})</div>

              </div>
            </div>  
             <button className='btn btn-dark my-3' onClick={submitReview}>Submit Reviews</button> 

              <div>
              <hr />
              <div className=''>Ad Reviews</div>
              <hr />

              {
                Ad?.reviews?.map((val, key) =>
                  <div key={key}>
                    <span className='fw-bold'>{val.username}</span>
                    <ReactStars
                      count={5}
                      size={15}
                      edit={false}
                      value={val.rating}
                      color2={'#ffd700'} />
                    <p>{val.review}</p>
                    <hr />
                  </div>
                )
              }
            </div>  
           </div>
      } 
    </>
  )
  
}