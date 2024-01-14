
export const reducer=(cart_state,action)=>{
    switch (action.type) {
 
 
     case "ADD_TO_CART":
       return{...cart_state, cart:[...cart_state.cart,action.payload]}
     case "CLEAR_CART":
         return{...cart_state, cart:[]}
 
       
       
    
     default:
       return cart_state;
    }
 
 
 }