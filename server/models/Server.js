import mongoose from 'mongoose';
const serverSchema = new mongoose.Schema(
    {
        timeStamp: Date,
        metaData: {serverId: String, os : string},
        metrics: {cpuUsage: Number, ramUsage: Number, freeDisk: Number}
    },
    {
        timeSeries:{
            timeField: 'timeStamp',
            metaField: 'metaData',
            granularity: 'seconds'
        },
        expireAfterSeconds: 2592000 
    }
);

const Server = mongoose.server || mongoose.model('server', serverSchema);