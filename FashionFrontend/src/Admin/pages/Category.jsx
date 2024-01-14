import React, { useState, useEffect } from 'react'
import AddCategoryModal from '../components/AddCategoryModal'
import UpdateCategory from "../components/UpdateCategory"
import axios from 'axios'

import { ReactSVG } from 'react-svg';
import {MdDelete} from 'react-icons/md'


export default function Category() {

//                                          GETTING ALL CATEGORIES
  const [Category, setCatgeory] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:1234/api/get-all-categories`)
      .then((getAllCategories) => setCatgeory(getAllCategories.data.Categories))
      .catch((error) => console.log(error))
  }, [])

  //                                        DELETE A CATEGORY

  const deleteCategory = (CategoryName) => {
    console.log(CategoryName);
  
    axios.delete(`http://localhost:1234/api/delete-category`, {
      data: { CategoryName } // Data ko object mein wrap karein
    })
      .then((response) => setCatgeory(response.data.Categories))
      .catch((error) => console.log(error.message));
  }
  


  return (
    <div className='container'>

      {/*                      HEADING       */}
      <div className="d-flex  rounded my-3 p-2 justify-content-between align-items-center">
        <span className='fs-4 fw-bold '>Categories</span>




        {/* MODAL OF ADDING NEW CATEGORY */}

        <AddCategoryModal  recallData={setCatgeory}  />



      </div>


      {/* Table */}
      <table className="table">


        {/*         table heading  */}
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Category Name</th>
            <th scope="col">Category SVG</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>








        {/* TABLE MAIN JO CATEGORY NAZAR ARAHIN WOH */}
        <tbody>
          {
            Category?.map((value, index) =>
              <tr key={index}>
                <td scope="row">{value._id}</td>
                <td>{value.CategoryName}</td>



                {/* svg */}


                <td>
                {value.CategorySVG && (
                  <ReactSVG
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(value.CategorySVG)}`}
                    className="svg-container"
                  />
                )}
              </td>

              


                <td>
                  <UpdateCategory/>
                <button className='btn btn-success mx-2' onClick={()=>deleteCategory(value.CategoryName)}><MdDelete /></button>
                </td>
              </tr>

            )
          }

        </tbody>
      </table>



    </div>
  )
}
