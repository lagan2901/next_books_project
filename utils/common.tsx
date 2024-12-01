import { NextApiResponse } from "next"
import Joi from 'joi'
import { join } from "path"
import { NextResponse } from "next/server"

export const errorHandler=(data:any)=>{
    // res.status(code).json({
    //     hasError:true,
    //     errorMessage:data
    // })
    return NextResponse.json({
        hasError:true,
        errorMessage:data
    });
}

export const responseHandler=(data:any)=>{
    return NextResponse.json(data);
}
export const emailSchema=Joi.string().email({ tlds: { allow: false } }).required().label('Email');
export const passwordSchema=Joi.string().min(4).max(20).required().description('password').label('Password');
export const nameSchema=Joi.string().required().description('Name').label('Name');
export const validateUser=(user:{})=>
{
    const JoiSchema = Joi.object({
        email: emailSchema,
		password: passwordSchema,
        fullname: nameSchema
    });
    return JoiSchema.validate(user);
}

export const getValue=(obj,path,defaultValue)=>{
    try{
        if(!(obj instanceof Array)){
            let myValue=obj;
            for(let key of path){
                if(!(key in myValue)){
                    return defaultValue;
                }
                else{
                    myValue=myValue[key];
                }
            }
            return myValue;
        }
        return defaultValue;
    }catch(err){
        return defaultValue;
    }
}
