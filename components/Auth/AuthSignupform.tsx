import style from './AuthSignupform.module.css'
import useValidate from '../../hooks/use-validate'
import Joi from 'joi'
import { emailSchema, nameSchema, passwordSchema } from '../../utils/common'
import { Fragment } from 'react'
const AuthSignUp:React.FC<{onsubmit:(name:string,email:string,password:string)=>{},onstart:()=>void}>=(props)=>{
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

    }=useValidate((x)=>{return passwordSchema.validate(x)})

    const {
        ChangeHandler:nameHandler,
        BlurHandler:nameBlurHandler,
        hasError:namehasError,
        enteredValue:name,
        erasevalues:erasename,
        errorStatement:nameError
    }=useValidate((x)=>{return nameSchema.validate(x)})

    let formvalid=false;
    if(emailError.length===0 && passwordError.length===0 && nameError.length===0){
        formvalid=true;
    }
    const submitHandler=(event:any)=>{
        props.onsubmit(name,email,password);
        event.preventDefault();
        // eraseemail()
        // erasepassword()
        // erasename()
    }

    return(
            <form onSubmit={submitHandler} className={style.form}>
                <div className={style.label}>
                    <label htmlFor="name">FullName</label>
                    <p>{namehasError?nameError:''}</p>
                </div>
                <input type="text" 
                    name='name'
                    value={name}
                    onChange={nameHandler}
                    onBlur={nameBlurHandler}
                    className={namehasError?style.errors:''}
                    onClick={props.onstart}
                />

                <div className={style.label}>
                    <label htmlFor="email">Email</label>
                    <p>{emailhasError?emailError:''}</p>
                </div>
                <input type="text" 
                    name='email'
                    value={email}
                    onChange={emailHandler}
                    onBlur={emailBlurHandler}
                    className={emailhasError?style.errors:''}
                    onClick={props.onstart}
                />

                <div className={style.label}>
                    <label htmlFor="password">Password</label>
                    <p>{passwordhasError?passwordError:''}</p>
                </div>
                <input type="password" 
                    name='password'
                    value={password}
                    onChange={passwordHandler}
                    onBlur={passwordBlurHandler}
                    className={passwordhasError?style.errors:''}
                    onClick={props.onstart}
                ></input>

                <div className={style.submitdiv}>
                    <p></p>
                    <button disabled={!formvalid} className={!formvalid?style.disabledbutton:''}>Sign Up</button>
                </div>
            </form>
    )
}

export default AuthSignUp