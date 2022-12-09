import requestsModel from "./requests-model.js";

export const createRequest = async (request) =>
    await requestsModel.create(request)

export const getAllRequests = async () =>
    await requestsModel.find()

export const findRequestByRequestId = async (id) =>
    await requestsModel.findOne({_id: id})

export const updateRequestDao = async (uid, request) =>
    await requestsModel.updateOne({_id: uid}, {$set: request})