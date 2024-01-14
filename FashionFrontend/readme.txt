Routing routes code:


import { Route,Routes, } from "react-router-dom";


    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/*" element={<BlogApp />} />
        <Route path="/users/*" element={<UserApp />} />
    </Routes>


