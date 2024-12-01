import React from 'react'
import useValidate from '../../hooks/use-validate'
import { emailSchema, passwordSchema } from '../../utils/common'
import style from './AuthLoginform.module.css'
const AuthLoginForm:React.FC<{onsubmit:(email:string,password:string)=>{},onstart:()=>void}>=(props)=>{
    const {
        ChangeHandler:emailHandler,
        BlurHandler:emailBlurHandler,
        hasError:emailhasError,
        enteredValue:email,
        erasevalues:eraseemail,
        errorStatement:emailError
    }=useValidate((x)=>{return emailSchema.validate(x)})

    const {
        ChangeHandler:passwordHandler,
        BlurHandler:passwordBlurHandler,
        hasError:passwordhasError,
        enteredValue:password,
        erasevalues:erasepassword,
        errorStatement:passwordError
    }=useValidate((x)=>{
        return passwordSchema.validate(x)})

    let formvalid=false;
    if(emailError.length===0 && passwordError.length===0){
        formvalid=true;
    }
    const submitHandler=(event:any)=>{
        event.preventDefault();
        props.onsubmit(email,password)
        // eraseemail()
        // erasepassword()
    }

    return(
        <form onSubmit={submitHandler} className={style.form}>
            <div className={style.label}>
                <label htmlFor="email">Email</label>
                <p>{emailhasError?emailError:''}</p>
            </div>
            <input type="text" 
                value={email}
                name='email'
                onChange={emailHandler}
                onBlur={emailBlurHandler}
                className={emailhasError?style.errors:''}
                onClick={props.onstart}
            ></input>

            <div className={style.label}>
                <label htmlFor="password">Password</label>
                <p>{passwordhasError?passwordError:''}</p>
            </div>
            <input type="password" 
                value={password}
                name='password'
                onChange={passwordHandler}
                onBlur={passwordBlurHandler}
                className={passwordhasError?style.errors:''}
                onClick={props.onstart}
            ></input>

            <div className={style.submitdiv}>
                <button disabled={!formvalid}>Sign In</button>
            </div>
        </form>
    )
}

export default AuthLoginForm