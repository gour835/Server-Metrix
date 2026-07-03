import mongoose, {type InferSchemaType} from "mongoose";

const serverMetrixSchema= new mongoose.Schema({
    timeseries:{
        timeField: 'date',
        metaField: 'ticker',
        granularity:'seconds'
    }
});

const ServerMetrixModel= mongoose.model('metrix', serverMetrixSchema);