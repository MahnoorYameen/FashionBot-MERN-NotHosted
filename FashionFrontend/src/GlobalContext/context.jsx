import React, { useEffect, useReducer } from 'react'
import { createContext } from 'react'
export const logincontext=createContext("initial value")   
//loginreducer function banaya tha humny in reducer file, wahan pe export kiya tha yaahn pe import krwa rhy for using that
import { loginreducer } from './reducer'
import Cookies from 'js-cookie'


//yeh ek object ha.
let data = {
  person: Cookies.get('token') || undefined
};
 
export default function LoginContextProvider({children}) {
//const [state, setstate/dispatch] = userReducer(function containing all cases, initial data)
    const [state,dispatch]=useReducer(loginreducer, data)

    useEffect(() => {
      Cookies.set('token', state.person)
  }, [state.person])



  return (
    <logincontext.Provider value={{state,dispatch}}>
        {children}
    </logincontext.Provider>
  )
}