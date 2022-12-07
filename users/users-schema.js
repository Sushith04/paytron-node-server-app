import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
                                        name: String,
                                        username: {type: String, unique: true, required: true},
                                        password: {type: String, required: true},
                                        email: String,
                                        phone: String,
                                        address: String,
                                        role: {type: String, enum: ['NGO', 'DONOR', 'ADMIN']},
                                        ngoHead: {type: String, default: ""},
                                        ngoDesc: {type: String, default: ""},
                                        ngoCause: {type: String, default: ""},
                                        donorProf: {type: String, default: ""},
                                        donorSalary: {type: Number, default: 0},
                                        donorMaxDon: {type: Number, default: 0},
                                        approvalStatus: {type: String, enum: ['PENDING', 'APPROVED'],
                                        default: 'PENDING'},
                                    }, {collection: 'users'})

export default usersSchema