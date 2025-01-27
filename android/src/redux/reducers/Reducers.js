import { ADD_TO_CART, ADD_TO_WISHLIST, REMOVE_FROM_CART } from "../ActionTypes";

const reducers1 = (state =[],action) =>{
    switch(action.type){
        case ADD_TO_CART:
            return [...state,action.payload];
        case REMOVE_FROM_CART:
            const deletedArray1 = state.filter((item,index)=>{
                return index !== action.payload
            })
            return deletedArray1;
        default:
             return state;
    }
};
export default reducers1;



// import { ADD_TO_CART, REMOVE_FROM_CART } from "../ActionTypes";

// const reducers1 = (state = [], action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       const existingIndex = state.findIndex((item) => item.id === action.payload.id);
//       if (existingIndex !== -1) {
//         // Item already exists, increment quantity
//         return state.map((item, index) =>
//           index === existingIndex
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         // Add new item with quantity 1
//         return [...state, { ...action.payload, quantity: 1 }];
//       }

//     case REMOVE_FROM_CART:
//       // Reduce quantity if greater than 1; otherwise, remove item
//       return state
//         .map((item, index) =>
//           index === action.payload
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         )
//         .filter((item) => item.quantity > 0);

//     default:
//       return state;
//   }
// };

// export default reducers1;





