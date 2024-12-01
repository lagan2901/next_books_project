import mongoose from "mongoose";
const connect = async () => {
  try{
  mongoose.connect(
    `mongodb+srv://lgn3269:HELLO23456@cluster0.vcb6e.mongodb.net/books?retryWrites=true&w=majority&appName=Cluster0`,
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

