import React from 'react'
import CategoryLine from '../../CommonFeatures/components/CategoryLine'
import Footer from '../../CommonFeatures/components/Footer'
import Ads from '../components/Ads'
import Banner from '../../CommonFeatures/components/Banner'

export default function Home() {
  return (
    <>
<Banner/>

<section classNamae="">
            <marquee className="" behavior="" direction="right" width="100%" id="home">Use AI ChatBot for Assistance</marquee>
        </section>

      <CategoryLine/>
      <Ads/>
      <Footer/>

    </>
  )
}
