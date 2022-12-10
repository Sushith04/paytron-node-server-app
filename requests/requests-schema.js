import mongoose from "mongoose";

const requestsSchema = mongoose.Schema({
                                           name: String,
                                           userName: String,
                                           time: Number,
                                           title: String,
                                           donation: {type: Number, default: 0},
                                           likes: {type: Number, default: 0},
                                           interests: {type: Number, default: 0},
                                           request: {type: String, required: true},
                                           likedDonors: {type: Array, default: []},
                                           interestedDonors: {type: Array, default: []}
                                       }, {collection: 'requests'})

export default requestsSchema