import mongoose from "mongoose";
import requestsSchema from "./requests-schema.js";

const requestsModel = mongoose.model('RequestModel', requestsSchema)

export default requestsModel