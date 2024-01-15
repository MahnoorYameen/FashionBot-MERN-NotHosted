import React from "react";

// importing components, pages
import Home from "./pages/Home";
import Navigationbar from "./components/Navigationbar";
// import SingleAdDynamic from "./pages/SingleAdDynamic";
// import PostAnAdd from "./pages/PostAnAdd";
// import AddDetails from "./components/AddDetails";
import AddDetails from "./pages/AddDetails";
import SingleDynamicAd from "./../CommonFeatures/pages/SingleDynamicAd"
import Chatbot from "../Guest/components/Chatbot";
import ContactUs from "../Guest/pages/ContactUs";
//import routing
import { Route, Routes } from "react-router-dom";
import SingleCategoryAds from "../CommonFeatures/pages/SingleCategoryAds";
// import Chatbot from "../Guest/components/Chatbot";
// import ContactUs from "../Guest/pages/ContactUs";

export default function User() {
  return (
    <>
      <Navigationbar />
      <Routes>
     <Route path="/get-ad-by-id/:_id" element={<SingleDynamicAd />} />

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
        {/* <Route path="/AdPostingPage" element={<AdPostingModal />} /> */}
        <Route path="/get-product-by-id/:_id" element={<AddDetails />} />
        {/* <Route path="/chatbot" element={<Chatbot />} /> */}
        {/* <Route path="/postadd" element={<PostAnAdd />} /> */}
        <Route path="/contactus" element={<ContactUs />} />
     <Route path="/get-ad-by-AdCategory/:CategoryName" element={<SingleCategoryAds />} />

        {/* <Route path="/register" element={<RegisterPage />} /> */}

        <Route path="/chatbot" element={<Chatbot />} />


        {/* <Route path="*" element={<Page404 />} /> */}
      </Routes>
    </>
  );
}
