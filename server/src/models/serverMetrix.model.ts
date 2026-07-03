import mongoose, {type InferSchemaType} from "mongoose";

const serverMetrixSchema= new mongoose.Schema({
    timeseries:{
        timeField: 'timeStamp',
        metaField: 'ticker',
        granularity:'seconds'
    }
});

const ServerMetrixModel= mongoose.model('metrix', serverMetrixSchema);