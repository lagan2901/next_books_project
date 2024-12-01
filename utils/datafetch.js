// "use strict";
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
// var __generator = (this && this.__generator) || function (thisArg, body) {
//     var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
//     return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
//     function verb(n) { return function (v) { return step([n, v]); }; }
//     function step(op) {
//         if (f) throw new TypeError("Generator is already executing.");
//         while (_) try {
//             if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
//             if (y = 0, t) op = [op[0] & 2, t.value];
//             switch (op[0]) {
//                 case 0: case 1: t = op; break;
//                 case 4: _.label++; return { value: op[1], done: false };
//                 case 5: _.label++; y = op[1]; op = [0]; continue;
//                 case 7: op = _.ops.pop(); _.trys.pop(); continue;
//                 default:
//                     if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
//                     if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
//                     if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
//                     if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
//                     if (t[2]) _.ops.pop();
//                     _.trys.pop(); continue;
//             }
//             op = body.call(thisArg, _);
//         } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
//         if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
//     }
// };
// exports.__esModule = true;
// var axios_1 = require("axios");
// var mongoose_1 = require("mongoose");
// var connect = function () {
//     mongoose_1["default"].connect("mongodb+srv://naman12:spW7F8n2bIrWoZSD@cluster0.9rzomve.mongodb.net/books?retryWrites=true&w=majority", {}, function (err) {
//         if (err)
//             console.log("Error connecting to MongoDB", err);
//         else
//             console.log("Connected to MongoDB");
//     });
// };
// var booksSchema = new mongoose_1["default"].Schema({
//     title: {
//         type: String
//     },
//     cover: {
//         type: String
//     },
//     author: [{
//             type: String
//         }],
//     category: {
//         type: String
//     },
//     description: {
//         type: String
//     },
//     price: {
//         type: Number
//     },
//     ratingcount: {
//         type: Number
//     },
//     rating: {
//         type: Number
//     },
//     reviews: [
//         {
//             type: mongoose_1["default"].Schema.Types.ObjectId,
//             ref: "Reviews"
//         }
//     ]
// });
// var categorySchema = new mongoose_1["default"].Schema({
//     title: {
//         type: String
//     },
//     books: [
//         {
//             id: {
//                 type: mongoose_1["default"].Schema.Types.ObjectId,
//                 ref: "Books"
//             },
//             price: {
//                 type: Number
//             },
//             ratingcount: {
//                 type: Number
//             },
//             rating: {
//                 type: Number
//             }
//         }
//     ]
// });
// var Books = mongoose_1["default"].model('booksdata', booksSchema);
// var BooksCategory = mongoose_1["default"].model('booksCategory', categorySchema);
// function generateRandom(min, max) {
//     if (min === void 0) { min = 0; }
//     if (max === void 0) { max = 100; }
//     var difference = max - min;
//     var rand = Math.random();
//     rand = Math.floor(rand * difference);
//     rand = rand + min;
//     return rand * 10;
// }
// function capitalize(input) {
//     input = input.replace(/\s+/g, ' ').trim();
//     var words = input.split(' ');
//     var CapitalizedWords = [];
//     words.forEach(function (element) {
//         CapitalizedWords.push(element[0].toUpperCase() + element.slice(1, element.length).toLowerCase());
//     });
//     var s = CapitalizedWords.join(' ');
//     return s;
// }
// var exce = function () { return __awaiter(void 0, void 0, void 0, function () {
//     var k, i, bookItems, _i, _a, item, data2, booksPriceAPI, priceDetail, bookDetail, category, newBook, bookSave, e_1;
//     var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
//     return __generator(this, function (_m) {
//         switch (_m.label) {
//             case 0:
//                 connect();
//                 k = 30000;
//                 _m.label = 1;
//             case 1:
//                 _m.trys.push([1, 12, , 13]);
//                 i = 1500;
//                 _m.label = 2;
//             case 2:
//                 if (!(i < 1750)) return [3 /*break*/, 11];
//                 return [4 /*yield*/, axios_1["default"].get("https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=p63ODY1boadAf776suWhYwCXNgl2B3qs&offset=".concat(i * 20))];
//             case 3:
//                 bookItems = _m.sent();
//                 _i = 0, _a = bookItems.data.results;
//                 _m.label = 4;
//             case 4:
//                 if (!(_i < _a.length)) return [3 /*break*/, 10];
//                 item = _a[_i];
//                 console.log(k++);
//                 if (!(item.isbns && item.isbns.length > 0 && item.isbns[0].isbn10)) return [3 /*break*/, 9];
//                 return [4 /*yield*/, axios_1["default"].get("https://www.googleapis.com/books/v1/volumes?q=isbn:".concat(item.isbns[0].isbn10))];
//             case 5:
//                 data2 = _m.sent();
//                 return [4 /*yield*/, axios_1["default"].get("https://booksrun.com/api/v3/price/buy/".concat(item.isbns[0].isbn10, "?key=pnkqtvnusbmf6xivwdcu"))];
//             case 6:
//                 booksPriceAPI = _m.sent();
//                 console.log((_f = (_e = (_d = (_c = (_b = booksPriceAPI.data) === null || _b === void 0 ? void 0 : _b.result) === null || _c === void 0 ? void 0 : _c.offers) === null || _d === void 0 ? void 0 : _d.booksrun) === null || _e === void 0 ? void 0 : _e["new"]) === null || _f === void 0 ? void 0 : _f.price);
//                 priceDetail = (_l = (_k = (_j = (_h = (_g = booksPriceAPI.data) === null || _g === void 0 ? void 0 : _g.result) === null || _h === void 0 ? void 0 : _h.offers) === null || _j === void 0 ? void 0 : _j.booksrun) === null || _k === void 0 ? void 0 : _k["new"]) === null || _l === void 0 ? void 0 : _l.price;
//                 if (priceDetail !== undefined) {
//                     priceDetail *= 10;
//                     priceDetail = Math.round(priceDetail * 100) / 100;
//                 }
//                 if (!(data2.data.items && data2.data.items.length > 0)) return [3 /*break*/, 9];
//                 bookDetail = data2.data.items[0];
//                 if (!(bookDetail.volumeInfo.title && bookDetail.volumeInfo.imageLinks && bookDetail.volumeInfo.description && bookDetail.volumeInfo.categories && (priceDetail !== undefined || (bookDetail.volumeInfo.averageRating && bookDetail.volumeInfo.ratingsCount)))) return [3 /*break*/, 9];
//                 category = capitalize(bookDetail.volumeInfo.categories[0]);
//                 newBook = new Books({
//                     title: bookDetail.volumeInfo.title,
//                     cover: bookDetail.volumeInfo.imageLinks.thumbnail,
//                     author: bookDetail.volumeInfo.authors,
//                     description: bookDetail.volumeInfo.description,
//                     category: category,
//                     rating: bookDetail.volumeInfo.averageRating || 0,
//                     price: priceDetail || generateRandom(10, 50),
//                     ratingcount: bookDetail.volumeInfo.ratingsCount || 0
//                 });
//                 return [4 /*yield*/, newBook.save()];
//             case 7:
//                 bookSave = _m.sent();
//                 return [4 /*yield*/, BooksCategory.findOneAndUpdate({ title: bookSave.category }, {
//                         $push: {
//                             books: {
//                                 _id: bookSave._id,
//                                 price: bookSave.price,
//                                 rating: bookSave.rating,
//                                 ratingcount: bookSave.ratingcount
//                             }
//                         }
//                     }, { upsert: true, "new": true, setDefaultsOnInsert: true })];
//             case 8:
//                 _m.sent();
//                 console.log(bookSave);
//                 _m.label = 9;
//             case 9:
//                 _i++;
//                 return [3 /*break*/, 4];
//             case 10:
//                 i++;
//                 return [3 /*break*/, 2];
//             case 11: return [3 /*break*/, 13];
//             case 12:
//                 e_1 = _m.sent();
//                 console.log('error');
//                 return [3 /*break*/, 13];
//             case 13: return [2 /*return*/];
//         }
//     });
// }); };
// exce();
