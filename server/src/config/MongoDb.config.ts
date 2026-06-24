import mongoose from "mongoose";

async function MongoDb() {
    mongoose.connection.on('connected',()=>{
        console.log('Database Connected');
    });
    await mongoose.connect(`${process.env.MONGO_DB_URL}/metrix`)
}

export default MongoDb;