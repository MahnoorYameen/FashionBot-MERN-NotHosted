import React from 'react'
import Footer from "./../../CommonFeatures/components/Footer"
import Ads from '../components/Ads'
import CategoryLine from '../../CommonFeatures/components/CategoryLine'
import Banner from "./../../CommonFeatures/components/Banner"
export default function Home() {
  return (
    <>
    

   <Banner/>

   <Link to="/chatbot" className="text-decoration-none">

<section classNamae="">
            <marquee className="text-dark" behavior="" direction="right" width="100%" id="home">Use AI ChatBot for Assistance</marquee>
        </section>
</Link>

   <CategoryLine/>
      <Ads />
      <Footer/>
    
    </>
  )
}
