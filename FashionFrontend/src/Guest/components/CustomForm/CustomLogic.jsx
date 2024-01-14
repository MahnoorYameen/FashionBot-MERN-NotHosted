import React from 'react'
import RegisterFormUser from './RegisterFormUser'
import LoginForm from './LoginForm'
import './FlipStyling.css'


export default function CustomLogic() {
  return (
    <>
    <div className="wrapper " >
            <div className="card-switch">
                <label className="switch">
                    <input type="checkbox" className="toggle" />
                    <span className="slider" />
                    <span className="card-side" />
                    <div className="flip-card__inner">

<LoginForm/>
<RegisterFormUser/>
                    </div>
                </label>
            </div>
        </div>
    
    
    
    </>
  )
}
