import axios from "axios";
import mongoose from "mongoose";
const connect = () => {
  mongoose.connect(
    `mongodb+srv://naman12:spW7F8n2bIrWoZSD@cluster0.9rzomve.mongodb.net/books?retryWrites=true&w=majority`,
    {},
    (err) => {
      if (err) console.log("Error connecting to MongoDB", err);
      else console.log("Connected to MongoDB");
    }
  );
};

// const booksSchema = new mongoose.Schema({
//   title: {
//     type: String,
//   },
//   cover: {
//     type: String,
//   },
//   author: [
//     {
//       type: String,
//     },
//   ],
//   category: {
//     type: String,
//   },
//   description: {
//     type: String,
//   },
//   price: {
//     type: Number,
//   },
//   ratingcount: {
//     type: Number,
//   },
//   rating: {
//     type: Number,
//   },
//   reviews: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Reviews",
//     },
//   ],
// });

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  books: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Books",
      },
      price: {
        type: Number,
      },
      ratingcount: {
        type: Number,
      },
      rating: {
        type: Number,
      },
    },
  ],
});

// export const Books = mongoose.model("booksdata", booksSchema);
export const BooksCategory = mongoose.model("booksCategory", categorySchema);

function generateRandom(min = 0, max = 100) {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand * 10;
}
function capitalize(input) {
  input = input.replace(/\s+/g, " ").trim();
  var words = input.split(" ");
  var CapitalizedWords = [];
  words.forEach((element) => {
    CapitalizedWords.push(
      element[0].toUpperCase() + element.slice(1, element.length).toLowerCase()
    );
  });
  var s = CapitalizedWords.join(" ");
  return s;
}
// const exce = async () => {
//   connect();
//   let k = 30000;
//   try {
//     for (let i = 1500; i < 1750; i++) {
//       const bookItems = await axios.get(
//         `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=p63ODY1boadAf776suWhYwCXNgl2B3qs&offset=${
//           i * 20
//         }`
//       );
//       for (let item of bookItems.data.results) {
//         console.log(k++);
//         if (item.isbns && item.isbns.length > 0 && item.isbns[0].isbn10) {
//           const data2 = await axios.get(
//             `https://www.googleapis.com/books/v1/volumes?q=isbn:${item.isbns[0].isbn10}`
//           );
//           let booksPriceAPI = await axios.get(
//             `https://booksrun.com/api/v3/price/buy/${item.isbns[0].isbn10}?key=pnkqtvnusbmf6xivwdcu`
//           );
//           console.log(booksPriceAPI.data?.result?.offers?.booksrun?.new?.price);
//           let priceDetail =
//             booksPriceAPI.data?.result?.offers?.booksrun?.new?.price;
//           if (priceDetail !== undefined) {
//             priceDetail *= 10;
//             priceDetail = Math.round(priceDetail * 100) / 100;
//           }
//           if (data2.data.items && data2.data.items.length > 0) {
//             const bookDetail = data2.data.items[0];
//             if (
//               bookDetail.volumeInfo.title &&
//               bookDetail.volumeInfo.imageLinks &&
//               bookDetail.volumeInfo.description &&
//               bookDetail.volumeInfo.categories &&
//               (priceDetail !== undefined ||
//                 (bookDetail.volumeInfo.averageRating &&
//                   bookDetail.volumeInfo.ratingsCount))
//             ) {
//               let category = capitalize(bookDetail.volumeInfo.categories[0]);
//               const newBook = new Books({
//                 title: bookDetail.volumeInfo.title,
//                 cover: bookDetail.volumeInfo.imageLinks.thumbnail,
//                 author: bookDetail.volumeInfo.authors,
//                 description: bookDetail.volumeInfo.description,
//                 category: category,
//                 rating: bookDetail.volumeInfo.averageRating || 0,
//                 price: priceDetail || generateRandom(10, 50),
//                 ratingcount: bookDetail.volumeInfo.ratingsCount || 0,
//               });
//               const bookSave = await newBook.save();
//               await BooksCategory.findOneAndUpdate(
//                 { title: bookSave.category },
//                 {
//                   $push: {
//                     books: {
//                       _id: bookSave._id,
//                       price: bookSave.price,
//                       rating: bookSave.rating,
//                       ratingcount: bookSave.ratingcount,
//                     },
//                   },
//                 },
//                 { upsert: true, new: true, setDefaultsOnInsert: true }
//               );
//               console.log(bookSave);
//             }
//           }
//         }
//       }
//     }
//   } catch (e) {
//     console.log("error");
//   }
// };
// exce();
