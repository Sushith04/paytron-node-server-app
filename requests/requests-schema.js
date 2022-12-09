import mongoose from "mongoose";

const requestsSchema = mongoose.Schema({
                                           name: String,
                                           userName: String,
                                           time: Number,
                                           title: {type: String, default: "Default Value"},
                                           image: {type: String, default: ""},
                                           liked: {type: Boolean, default: false},
                                           likes: {type: Number, default: 0},
                                           interested: {type: Boolean, default: false},
                                           interests: {type: Number, default: 0},
                                           request: {type: String, required: true},
                                    }, {collection: 'requests'})

export default requestsSchema