import mongoose from "mongoose";

const connectMongoose = async () => {
  try {
   await mongoose.connect(process.env.MONGO_URL,
  { serverSelectionTimeoutMS: 10000 }
)

    console.log("✅ MongoDB Connected Successfully")
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

export default connectMongoose;
