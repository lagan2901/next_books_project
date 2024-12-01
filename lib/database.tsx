import mongoose from "mongoose";
const connect = async () => {
  try{
  mongoose.connect(
    `mongodb+srv://naman12:spW7F8n2bIrWoZSD@cluster0.9rzomve.mongodb.net/books?retryWrites=true&w=majority`,
    {},
    (err) => {
      if (err) console.log("Error connecting to MongoDB", err);
      else console.log("Connected to MongoDB");
    }
  );
} catch (err) {
  console.log(err);
}
};

export default connect;

