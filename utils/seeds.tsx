import mongoose from "mongoose";
const booksSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    cover:{
        type:String,
    },
    author:[{
        type:String
    }],
    category:{
        type:String
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
    },
    ratingcount:{
        type:Number,
    },
    rating:{
        type:Number,
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Reviews"
        }
    ]
})


const categorySchema=new mongoose.Schema({
    title:{
        type:String
    },
    books:[
        {
            id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Books"
            },
            price:{
                type:Number,
            },
            ratingcount:{
                type:Number,
            },
            rating:{
                type:Number,
            }
        }
    ]

})

mongoose.models={};
const Books= mongoose.model('booksdata',booksSchema)
export const BooksCategory=mongoose.model('booksCategory',categorySchema)
export default Books;

// const booksSchema=new mongoose.Schema({
//     title:{
//         type:String,
//     },
//     cover:{
//         type:String,
//     },
//     category:[
//         {type:String}
//     ],
//     description:{
//         type:String,
//     }
// })