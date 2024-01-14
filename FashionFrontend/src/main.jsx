import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginContextProvider from './GlobalContext/context.jsx'
import { SearchProvider } from "./User/context/searchContext.jsx";
import CartContextProvider from './User/context/context.jsx'
import "./index.css";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter>
      <LoginContextProvider>
        <SearchProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </SearchProvider>
      </LoginContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
