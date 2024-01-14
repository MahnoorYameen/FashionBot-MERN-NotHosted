import React from 'react'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Category from './pages/Category'
import { Routes, Route } from 'react-router-dom'
import RecentAdAdmin from './pages/RecentAdAdmin'

export default function Admin() {
  return (
  
    <div className="row">
      <div className="col-md-3 m-0 p-0 border border-secondary" style={{ height: '100vh' }}><Sidebar /></div>
      <div className="col-md-9">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/AllAds" element={<RecentAdAdmin />} />
        </Routes>
      </div>
    </div>


    
  )
}
