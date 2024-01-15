import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link } from "react-router-dom";

import Swal from 'sweetalert2'


import FloatingLabel from 'react-bootstrap/FloatingLabel';
//                         FIREBASE
import { storage } from '../../Admin/utilities/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";




export default function AdPostingModal() {

  //yeh ha modal ki setting ka
  const [show, setShow] = useState(false);

  //wo api jo mungwai
  const [Category, setCategories] = useState([])

  //hamary pas each elements, USESTATES FOR ELEMENTS STORING
  const [AdName, setAdName] = useState("")
  const [AdPrice, setAdPrice] = useState(0)
  const [AdLocation, setAdLocation] = useState(0)
  const [AdCategory, setAdCategory] = useState("")
  const [AdThumbnail, setAdThumbnail] = useState(null)
  const [AdDescription, setAdDescription] = useState("")
  const [AdImageArray, setAdImageArray] = useState([])


  const handleClose = () => setShow(false);
const handleShow=()=> setShow(true)
  // category  mungwa liya
 
  useEffect(()=>{
    axios.get("http://localhost:1234/api/get-all-categories").then(json => {
      setCategories(json.data.Categories)
      })
      .catch(err => console.log(err))
  },[])

  //image bhej kr url mungwana paancho k liye
  const urls = []  //array isliye ku k ziada hain images

  const MultipleImageUpload = () => AdImageArray?.map((val) => {   //ku k yeh array hai isliye index nh diya
    const MultipleImageRef = ref(storage, `/images/ads/${AdName}/${val.name}`);
    return uploadBytes(MultipleImageRef, val).then((snapshot) => {
      return getDownloadURL(snapshot.ref).then((url) => { urls.push(url) }).catch((error) => alert(error));
    });
  })


  //                      FORM SUBMIT FUNCTION
  const PostAd = (e) => {
    e.preventDefault();

    //images upload kr rhy hain hum 
    const uploadImages = MultipleImageUpload()

    // jo images ayin hain unko promise banaya
    Promise.all(uploadImages)
      .then(() => {

        const storageRef = ref(storage, `/images/ads/${AdName}/${AdThumbnail.name}`);
        uploadBytes(storageRef, AdThumbnail)
          .then((snapshot) => {

            // successfully firebase pe jany k bad ab hum unka url mungwa rhy
            getDownloadURL(snapshot.ref)
              .then((url) => {

                const payload = {
                  AdName,
                  AdPrice,
                  AdLocation,
                  AdCategory,
                  AdThumbnail: url,
                  AdDescription,
                  AdImageArray: urls
                }
                console.log(payload)
                axios.post("http://localhost:1234/api/create-ad", payload).then((json) => {
                  console.log(json.data)
                  setShow(false)
                  Swal.fire({
                    title: 'Ad Posted',
                    text: 'Thank you for posting ad ',
                    icon: 'success',
                    confirmButtonText: 'Continue'
                  })
                })


                // unsuccessful post
                  .catch((err) => {console.log(err.response.data)
                    Swal.fire({
                      title: 'Ad Not Posted',
                      text: 'Sorry For inconvinience ',
                      icon: 'error',
                      confirmButtonText: 'Continue'
                    })
                  })
              })
              .catch((error) => { console.log(error) });
          });
      })
      .catch(err => console.log(err))


    
  }



  //                                       RETURN
  return (
    <>
        <Button variant="light" style={{backgroundColor:'#ffd7ba '}} onClick={handleShow}>Post Add</Button>

      <Modal show={show} onHide={handleClose} centered backdrop="static" size="lg">
        <Modal.Header closeButton style={{ backgroundColor: '#ffd7ba ' }}>
          <Modal.Title>Post AD</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#fff8f4 ' }}>

          <form onSubmit={PostAd}>
            <div className="row">
              <div className="col">
                <FloatingLabel controlId="adname" label="Ad Name" className="mb-3 text-secondary"                                >
                  <Form.Control type="text" placeholder="Ad Name" value={AdName} onChange={(e) => setAdName(e.target.value)} />
                </FloatingLabel>
              </div>
              <div className="col">
                <FloatingLabel controlId="price" label="Ad Price" className="mb-3 text-secondary"                                >
                  <Form.Control type="number" placeholder="Ad Price" value={AdPrice} onChange={(e) => setAdPrice(e.target.value)} />
                </FloatingLabel>
              </div>
              <div className="col">
                <FloatingLabel controlId="Location" label="Ad Location" className="mb-3 text-secondary"                                >
                  <Form.Control type="text" placeholder="Ad Location" value={AdLocation} onChange={(e) => setAdLocation(e.target.value)} />
                </FloatingLabel>
              </div>
            </div>



            <div className="mb-3">
              <label htmlFor="thumbnail" className="form-label">
                Ad Thumbnail
              </label>
              <input className="form-control" onChange={(e) => setAdThumbnail(e.target.files[0])} type="file" id="thumbnail" />
            </div>

            <div className="mb-3">

              <p className='mb-0 fw-semibold'>Choose Images</p>
              <small className="text-secondary">Double Click to Delete Images</small>
              <div className="mt-2 d-flex gap-2 align-items-center">
                {
                  AdImageArray.map((val, key) =>
                    <div key={key} className="bg-light border rounded col-md-1"
                      //double click se image hatwa dengy
                      onDoubleClick={() => setAdImageArray(AdImageArray.filter((img) => img != val))}>
                      <img style={{ height: '10vh', cursor: 'pointer', objectFit: 'contain' }}

                        className='img-fluid' src={URL.createObjectURL(val)} alt="" />
                    </div>)
                }
                <label htmlFor="formFile" style={{ height: '10vh', cursor: 'pointer' }} className="col-md-1 d-flex border border-dark border-2 justify-content-center align-items-center rounded  fs-3 fw-bold form-label">
                  +
                </label>
              </div>


              <input className="form-control d-none " onChange={(e) => setAdImageArray([...AdImageArray, e.target.files[0]])} type="file" id="formFile" />
            </div>


            <div className="row">
              <div className="col">
                <Form.Group className="mb-3" >
                  <FloatingLabel controlId="selectCategory" label="Select Category">
                    <Form.Select aria-label="Please Select a Category" onChange={(e) => setAdCategory(e.target.value)}>
                      <option>Please Select a Category</option>
                      {
                        Category?.map((val, key) => <option key={key} value={val.CategoryName}>{val.CategoryName}</option>)
                      }
                    </Form.Select>
                  </FloatingLabel>
                </Form.Group>
              </div>
            </div>
            <FloatingLabel controlId="floatingTextarea2" label="Description" className='mb-3'>
              <Form.Control
                value={AdDescription}
                onChange={(e) => setAdDescription(e.target.value)}
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
              />
            </FloatingLabel>
            <button type="submit" className="btn btn-outline-warning " >
              Submit
            </button>
            
            <Link to="/" className=" mx-3 btn btn-outline-warning " onClick={handleClose}>
              close
            </Link>
          </form>
        </Modal.Body>

      </Modal>
    </>
  );



}