import * as requestDao from "./requests-dao.js";
import multer from "multer";
import path from "path";
import * as Cloudinary from 'cloudinary'


const RequestsController= (app) => {

    const createRequest = async (req, res) => {
        const request = req.body;
        const createdRequest = await requestDao.createRequest(request)
        res.json(createdRequest);
    }

    const findAllRequests = async (req, res) => {
        const requestsInDatabase = await requestDao.getAllRequests();
        res.json(requestsInDatabase)
    }

    app.post('/request', createRequest)
    app.get('/requests', findAllRequests)
}

export default RequestsController