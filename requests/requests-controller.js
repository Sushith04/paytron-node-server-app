import * as requestDao from "./requests-dao.js";
// import {findRequestByRequestId} from "./requests-dao.js";
const RequestsController = (app) => {

    const createRequest = async (req, res) => {
        const request = req.body;
        const createdRequest = await requestDao.createRequest(request)
        res.json(createdRequest);
    }

    const findAllRequests = async (req, res) => {
        const requestsInDatabase = await requestDao.getAllRequests();
        res.json(requestsInDatabase)
    }

    const updateRequest = async (req, res) => {
        const requestId = req.params.rid;
        const updates = req.body;
        // console.log("updates",updates)
        //const userID = updates.interestedUsers.at(-1);
        //console.log("userID", userID)
        //const user = await userDao.findUserByUserId(userID);
        //console.log("user", user)

        //user.interestedRequests.push(requestId);
        //await userDao.updateProfileDao(userID, user);
        const request = await requestDao.updateRequestDao(requestId, updates);
        const updatedrequest = await requestDao.findRequestByRequestId(requestId)
        res.json(updatedrequest)
    }

    app.post('/request', createRequest)
    app.get('/requests', findAllRequests)
    app.put('/updateRequest/:rid', updateRequest);
}

export default RequestsController