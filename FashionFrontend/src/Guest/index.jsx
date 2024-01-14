import React from 'react'
import {Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import Navigationbar from './components/Navigationbar'
import Chatbot from './components/Chatbot'
import PostAnAdd from '../User/pages/PostAnAdd'
import ContactUs from './pages/ContactUs'
import AddDetails from '../User/pages/AddDetails'

import SingleDynamicAd from "./../CommonFeatures/pages/SingleDynamicAd"
import SingleCategoryAds from '../CommonFeatures/pages/SingleCategoryAds'
//                            MT WORK
import RegisterPage from './pages/RegisterPage'
// import ChatForm from '../User/components/ChatForm'



export default function Guest() {
  
return (
<>

<Navigationbar/>
<Routes>
     <Route path="/" element={<Home />} />
     <Route path="/login" element={<LoginPage />} />
     <Route path="/register" element={<RegisterPage />} />
     <Route path="/chatbot" element={<Chatbot />} />
     <Route path="/postadd" element={<PostAnAdd />} />
     <Route path="/contactus" element={<ContactUs />} />
     <Route path="/add/:_id" element={<AddDetails />} />
     <Route path="/get-ad-by-id/:_id" element={<SingleDynamicAd />} />
     <Route path="/get-ad-by-AdCategory/:CategoryName" element={<SingleCategoryAds />} />





     {/* <Route path="/postadd" element={<PostAnAdd />} /> */}


     {/* <Route path="/chat" element={<ChatForm/>}/> */}

     <Route path="*" element={<Navigate to="/" replace={true} />} />

</Routes>
</>
  )
}
