import mongoose, { type InferSchemaType } from "mongoose"

const serverSchema = new mongoose.Schema({
    Ipv4: {
        type: String,
        required: true
    },
    Ipv6: {
        type: String,
        required: false
    },
    x_api_key: {
        type: String,
        required: true
    }
}, { timestamps: true });

export type ServerType = InferSchemaType<typeof serverSchema>
const serverModel = mongoose.models.server ? (mongoose.models.server as mongoose.Model<ServerType>) : mongoose.model<ServerType>('server', serverSchema);

export default serverModel;