import { useCallback, useEffect, useState } from "react"
import { getValue } from "../utils/common";

const useValidate=(check:(value:string)=>{})=>{
    const [enteredValue,setvalue]=useState('');
    const [isTouched,setTouched]=useState(false);
    const [errorStatement,setError]=useState('fff');
    
    const hasError= (errorStatement.length>0) && isTouched;
    const res=check(enteredValue);
    const value=getValue(res.error,['details','0','message'],'');
    const use=useCallback(()=>{
        if(value.length>0){
            setError(()=>value)
        }
        else {
            setError(()=>'')
        }
    },[value])

    useEffect(()=>{
        use();
    },[use])
    

    const ChangeHandler=(event:{target:{value:string}})=>{  
        setvalue(()=>event.target.value);
    }
    const BlurHandler=()=>{
       setTouched(true);
    }

    const erasevalues=()=>{
        setvalue('')
        setTouched(false)
    }
    return{
        ChangeHandler,
        BlurHandler,
        hasError,
        enteredValue,
        erasevalues,
        errorStatement
    }
}

export default useValidate;