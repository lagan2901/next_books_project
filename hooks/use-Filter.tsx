import {useState,useRef,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { product } from "../store/productsstore";
const productActions=product.actions;
const useFilter=()=>{
    const [paragraph,setparagraph]=useState<{key:string;para:string}[]>([])
    const dispatch=useDispatch();
    const Handler=(deps:any,key:string,para:string)=>{
        
        const didMount=useSelector<RootState,boolean>(state=>{
            type ObjectKey = keyof typeof state.products;
            const myVar = key as ObjectKey;
            var y=state.products[myVar];
            return y.show;
        })
        
        useEffect(() => {
            if (didMount) {
                setparagraph((prevState)=>{
                    const newState=prevState;
                    const k=newState.find(el=>el.key===key)
                    if(k){
                        newState.map((el)=>{
                            return (el.key===key)?(el.para=para):el
                        })
                    }
                    else{
                        newState.push({key:key,para:para})
                    }
                    return newState;
                })
            }
            else{
                dispatch(productActions.changeshow(key))
            }
        }, [deps]);
    }
    const crossHandler=(getkey:string)=>{
        setparagraph((prevState)=>{
            const newState=prevState.filter((el)=>{
                return el.key!=getkey;
            });
            return newState;
        })
        // console.log(paragraph);
    }

    
    return {
        paragraph
        ,Handler
        ,crossHandler
    }
}

export default useFilter;