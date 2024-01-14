import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

//                         FIREBASE
import { storage } from '../utilities/FirebaseConfig'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


function AddCategoryModal({recallData}) {

    // MODAL FUNCTIONS
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // USESTATES FOR CATEGORY NAME AND IMAGE
    const [CategoryName, setCategoryName] = useState("")
    const [CategorySVG, setCategorySVG] = useState("")
    // const [CategoryImage, setCategoryImage] = useState(null)

    //                      FORM SUBMIT FUNCTION
    const AddCategory = (e) => {
        e.preventDefault();

                    const payload={
                        CategoryName,
                        CategorySVG,
                    }

                    axios.post("http://localhost:1234/api/create-category", payload)
                    .then((json)=>{ setShow(false); //after post modal band krdena
                    recallData(json.data.AllCategory);
                    }
                    
                    )          
                    .catch((error)=>alert(error.message))
                
                .catch((error) => {
                    console.log(error)
                });
        
    }

    
    return (
        <>


        {/* BUTTON FOR ADDING NEW CATEGORY */}


            <Button  className='bg-primary text-dark' onClick={handleShow}>
                Add Category
            </Button>





            {/* ADD CATEGORY MODAL, UPER DIYE HUAY BUTTON PE CLICK KRNY PE YEH ON HOGA */}

            
            <Modal show={show} onHide={handleClose} centered backdrop="static" >


                <Modal.Header closeButton >
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>



                <Modal.Body>

                    {/* Yahan hum apna form laga rahy,*/}


                    {/* CATEGORY NAME */}
                    <form onSubmit={AddCategory}>
                        <div className="mb-3">
                            <label htmlFor="CategoryName" className="form-label">
                                Categeory Name
                            </label>
                            <input
                                value={CategoryName}
                                onChange={(e) => { setCategoryName(e.target.value) }}
                                type="text"
                                className="form-control"
                                id="CategoryName"
                                aria-describedby="emailHelp"
                            />
                        </div>

                        {/* CATEGORY SVG */}

                        <div className="mb-3">
                            <label htmlFor="CategorySVG" className="form-label">
                                Categeory SVG CODE
                            </label>
                            <input
                                value={CategorySVG}
                                onChange={(e) => { setCategorySVG(e.target.value) }}
                                type="text"
                                className="form-control"
                                id="CategorySVG"
                                aria-describedby="CATEGORYSVGHelp"
                            />
                        </div>



{/*                             CATEGORY IMAGE */}
                    

                        <button type="submit" className="btn ">
                            Submit
                        </button>
                    </form>
                </Modal.Body>
                
                
            </Modal>
        </>
    );
}
export default AddCategoryModal;