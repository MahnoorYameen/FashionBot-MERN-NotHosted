import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSearch } from "../../User/context/searchContext";



export default function RecentAdAdmin() {
  const { searchQuery, setSearchQuery } = useSearch();
  const [adds, setAdds] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);

        let apiUrl = "http://localhost:1234/api/getAdd";

        // If there is a search query, append it to the API URL
        if (searchQuery) {
          apiUrl += `?category=${searchQuery}`;
        }

        const response = await axios.get(apiUrl);
        setAdds(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [searchQuery]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Ads List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : adds.length === 0 ? (
        <p>No ads found for "{searchQuery}"</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {adds.map((add) => (
            <li
              key={add.title}
              className="border p-4 rounded shadow-md transition-transform transform hover:scale-105"
            >
              <Link to={`/add/${add._id}`} className="block mb-2">
                {add.images &&
                  add.images.length > 0 &&
                  add.images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:1234/uploads/${image[index]}`}
                      // src={'..'}
                      alt="Loading Image..."
                      className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 h-auto object-cover rounded"
                    />
                  ))}
              </Link>
              <Link to={`/add/${add._id}`}>
                <h1 className="text-stone-950 text-xl font-semibold hover:text-gray-700">
                  {add.title}
                </h1>
              </Link>
              <p className="text-gray-600 mb-2">{add.description}</p>
              <p className="text-blue-500">{add.price}</p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-500 mr-2">
                  {add.category}
                </span>
                <span className="text-sm text-gray-500">{add.location}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
