import requestsModel from "./requests-model.js";

export const createRequest = async (request) =>
    await requestsModel.create(request)

export const getAllRequests = async () =>
    await requestsModel.find()
