"use client"

import { createSlice } from "@reduxjs/toolkit";
const intitalproductState={
    rating: {value:0,show:false},
    reviews:{value:'max',show:false},
    price:  {value:[0,100],show:false},
    genre:  {value:['ll'],show:false}
}
export const product=createSlice({
    name:'products',
    initialState:intitalproductState,
    reducers:{
        intialproductState(state,actions){
            if(actions.payload==='price') state.price=intitalproductState.price
            else if(actions.payload==='reviews') state.reviews=intitalproductState.reviews
            else if(actions.payload==='rating') state.rating=intitalproductState.rating
        },
        setrating(state,actions){state.rating.value=actions.payload+1},
        setprice(state,actions){
            state.price.value=(actions.payload.value===0)?[actions.payload.target,state.price.value[1]]:[state.price.value[0],actions.payload.target]
        },
        setsortReview(state,actions){
            state.reviews.value=actions.payload
        },
        addgenre(state,actions){
            if(actions.payload.isActive==false){
                state.genre.value.push(actions.payload.name)
            }
            else{
                const ans=state.genre.value.filter(el=>el!=actions.payload.name)
                state.genre.value=ans;
            }
        },

        changeshow(state,actions){
            type ObjectKey = keyof typeof state;
            const myVar = actions.payload as ObjectKey;
            state[myVar].show=true;
        }
    }
})
export default product.reducer