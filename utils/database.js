import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  

  if (isConnected) {
    console.log("Connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Promptopia",
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    isConnected = true;

    console.log("MongoDB Connected")
  } catch (error) {
    console.error(error)
  }
};
