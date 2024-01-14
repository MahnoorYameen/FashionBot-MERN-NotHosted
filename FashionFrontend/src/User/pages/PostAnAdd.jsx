import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { GiClothespin } from "react-icons/gi";

Modal.setAppElement("#root"); // Set the root element for accessibility

const PostAnAdd = () => {
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productCity, setProductCity] = useState("");
  const [productImgs, setProductImgs] = useState([]);
  const [ProductCategory, setProductCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   http://localhost:1234/api/login

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (event) => {
    const files = event.target.files;

    try {
      const selectedImages = await Promise.all(
        Array.from(files).map(async (file) => ({
          file,
          preview: await readFile(file),
        }))
      );

      setProductImgs(selectedImages);
    } catch (error) {
      console.error("Error reading or processing files:", error);
    }
  };

  const postAnAdd = async () => {
    try {
      // Check if ProductCategory is defined and not an empty string
      if (ProductCategory === undefined || ProductCategory.trim() === "") {
        // Display an error message to the user
        console.error("Category is missing or empty");
        // You may want to handle this case by displaying an error to the user or taking appropriate action
        return;
      }

      // Create an object to represent the data
      const postData = new FormData();
      postData.append("title", productTitle);
      postData.append("price", productPrice);
      postData.append("description", productDesc);
      postData.append("location", productCity);
      postData.append("category", ProductCategory);

      productImgs.forEach((image, index) => {
        postData.append("images", image.file);
      });

      // Make a POST request to your backend API
      const response = await axios.post(
        "http://localhost:1234/api/postAnAdd",
        postData
      );

      // Handle the response from the server
      console.log("Response from server:", response.data);
      setIsModalOpen(true);
    } catch (error) {
      // Handle errors
      console.error("Error posting ad:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 my-5">
        <div className="bg-white-400 rounded-lg shadow-md p-8">
          <div className="mb-4">
            <label className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-md cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
              <span className="text-gray-500">Click to upload an image</span>
            </label>
            <div className="flex items-center justify-center mt-4">
              <div className="flex items-center justify-center mt-4">
                {productImgs.length > 0 &&
                  productImgs.map((image, index) => (
                    <img
                      key={index}
                      className="w-32 h-24 object-cover rounded-md mr-4"
                      src={image.preview}
                      alt={`Image ${index}`}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" for="title">
                Product Title
              </label>
              <input
                type="text"
                className="border-b-2 w-full border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300"
                id="product-title"
                name="product-title"
                placeholder="Enter product-title"
                required
                value={productTitle}
                onChange={(event) => {
                  setProductTitle(event.target.value);
                }}
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="product-description"
              >
                Description
              </label>
              <textarea
                className="border-b-2 w-full border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300"
                id="product-description"
                name="product-description"
                placeholder="Enter Description"
                required
                value={productDesc}
                onChange={(event) => {
                  setProductDesc(event.target.value);
                }}
              ></textarea>
            </div>

            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                for="product-price"
              >
                Price
              </label>
              <input
                type="number"
                className="border-b-2 w-full border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300"
                id="product-price"
                name="product-price"
                placeholder="Enter product price"
                required
                value={productPrice}
                onChange={(event) => {
                  setProductPrice(event.target.value);
                }}
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                for="product-category"
              >
                Category
              </label>

              <p value="">Select a category</p>
              <p value="electronics">Electronics</p>
              <p value="clothing">Clothing</p>
              <p value="furniture">Furniture</p>

              <input
                type="text"
                className="form-input w-full"
                id="product-city"
                name="product-city"
                placeholder="Enter One From Above"
                required
                value={ProductCategory}
                onChange={(event) => {
                  setProductCategory(event.target.value);
                }}
              />
            </div>

            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                for="product-location"
              >
                Enter your City
              </label>
              <input
                type="text"
                className="border-b-2 w-full border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300"
                id="product-city"
                name="product-city"
                placeholder="Enter The product city"
                required
                value={productCity}
                onChange={(event) => {
                  setProductCity(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={postAnAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-700"
            >
              Post Ad
            </button>
            {/* Modal for success message */}
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="Success Modal"
              className="Modal"
              overlayClassName="Overlay"
            >
              <div className="text-center">
                <GiClothespin
                  className="text-green-500 mx-auto mb-4"
                  size={50}
                />
                <h2 className="text-xl font-bold mb-2">
                  Ad Posted Successfully!
                </h2>
                <p>Your ad has been successfully posted.</p>
                <button
                  onClick={closeModal}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md font-bold hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostAnAdd;
