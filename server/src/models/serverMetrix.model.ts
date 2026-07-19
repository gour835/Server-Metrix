import { timeStamp } from "console";
import mongoose, { type InferSchemaType } from "mongoose";

const serverMetrixSchema = new mongoose.Schema({
    timeStamp: Date,
    memory: Object,
    cpus: Object,
    metadata: {
        x_api_key: String,
        ipv4: String

    }

}, {
    timeseries: {
        timeField: 'timeStamp',
        metaField: 'metadata',
        granularity: 'seconds'
    }
});

const ServerMetrixModel = mongoose.model('metrix', serverMetrixSchema);

export default ServerMetrixModel;