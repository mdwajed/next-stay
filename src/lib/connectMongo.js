// import mongoose from "mongoose";

// const MONGO_URI = process.env.MONGO_URI;
// const cached = {};
// async function connectMongo() {
//   if (!MONGO_URI) {
//     throw new Error(
//       "Please define the MONGO_URI environment variable inside .env.local"
//     );
//   }
//   if (cached.connection) {
//     console.log("connected to mongo db");
//     return cached.connection;
//   }
//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };
//     cached.promise = mongoose.connect(MONGO_URI, opts);
//   }
//   try {
//     cached.connection = await cached.promise;
//   } catch (e) {
//     cached.promise = undefined;
//     throw e;
//   }
//   return cached.connection;
// }
// export default connectMongo;
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export default async function connectMongo() {
  if (mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
}
