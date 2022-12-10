import usersModel from "./users-model.js";

export const createUser = async (user) =>
    await usersModel.create(user)

export const findUserByUsername = async (username) =>
    await usersModel.findOne({username})

export const findUserByCredentials = async (username, password) =>
    await usersModel.findOne({username, password, approvalStatus: "APPROVED"})

export const findPendingDonors = async () =>
    await usersModel.find({role: "DONOR", approvalStatus: "PENDING"})

export const findPendingNGOs = async () =>
    await usersModel.find({role: "NGO", approvalStatus: "PENDING"})

export const updateUserApproval = async (uid) =>
    await usersModel.updateOne({_id: uid}, {$set: {"approvalStatus": "APPROVED"}})

export const findUserByUserId = async (id) =>
    await usersModel.findOne({_id: id})

export const updateProfileDao = async (uid, profile) =>
    await usersModel.updateOne({_id: uid}, {$set: profile})

export const findUsersByUsername = async (username) =>
await usersModel.find({username:{$regex:"(.*?)"+username,$options:"$i"}})