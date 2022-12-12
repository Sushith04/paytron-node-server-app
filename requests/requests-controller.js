import * as requestDao from "./requests-dao.js";
import * as userDao from "../users/users-dao.js"
const RequestsController = (app) => {

    const createRequest = async (req, res) => {
        const request = req.body;
        const uid = req.params.uid;
        const user = await userDao.findUserByUserId(uid);
        const createdRequest = await requestDao.createRequest(request)
        user.createdRequests.push(createdRequest._id)
        const updateUserstatus = await userDao.updateProfileDao(uid, user);
        res.json(createdRequest);
    }

    const findAllRequests = async (req, res) => {
        const requestsInDatabase = await requestDao.getAllRequests();
        res.json(requestsInDatabase)
    }

    const updateRequestLikes = async (req, res) => {
        const requestId = req.params.rid;
        const userId = req.params.uid;
        const user = await userDao.findUserByUserId(userId);
        const request = await requestDao.findRequestByRequestId(requestId);
        if (request.likedDonors.includes(userId)) {
            // Already liked: so Unlike
            // Reduce like count
            request.likes = request.likes-1;
            // Remove req from user likes
            const index = request.likedDonors.indexOf(userId);
            request.likedDonors.splice(index, 1)
        }
        else {
            // Liked
            request.likes = request.likes+1;
            // Add requests to liked list of user
            request.likedDonors.push(userId)

        }
        // update request
        const reqUpdatestatus = await requestDao.updateRequestDao(requestId, request);
        const updatedrequest = await requestDao.findRequestByRequestId(requestId)
        res.json(updatedrequest)
    }

    const updateRequestInterests = async (req, res) => {
        const requestId = req.params.rid;
        const userId = req.params.uid;
        const user = await userDao.findUserByUserId(userId);
        const request = await requestDao.findRequestByRequestId(requestId);
        if (request.interestedDonors.includes(userId)) {
            // Already interested: so Uninterest it
            // Reduce interest count
            request.interests = request.interests - 1;
            // Remove user from req interests
            let index = request.interestedDonors.indexOf(userId);
            request.interestedDonors.splice(index, 1)
            // Remove req from user interests
            index = user.interestedRequests.indexOf(requestId);
            user.interestedRequests.splice(index, 1);
        }
        else {
            // Liked
            request.interests = request.interests + 1;
            // Add users to intersted list of request
            request.interestedDonors.push(userId)
            // Add requests to intersted list of user
            user.interestedRequests.push(requestId)

        }
        // update request
        const reqUpdatestatus = await requestDao.updateRequestDao(requestId, request);
        // update user
        const userUpdatestatus = await userDao.updateProfileDao(userId, user)
        const updatedrequest = await requestDao.findRequestByRequestId(requestId)
        res.json(updatedrequest)
    }

    const getInterestedDonorsOfRequest = async (req, res) => {
        const requestId = req.params.rid;
        const request = await requestDao.findRequestByRequestId(requestId);
        let interestedDonorsOfRequest = [];
        for(const userid of request.interestedDonors) {
            const user = await userDao.findUserByUserId(userid);
            interestedDonorsOfRequest.push(user)
        }
        res.json(interestedDonorsOfRequest)
    }

    const deleteRequest = async (req, res) => {
        const requestId = req.params.rid;
        const request = await requestDao.findRequestByRequestId(requestId);
        const users = await userDao.findAllUsers();
        for (const user of users) {
             if (user.username === request.userName) {
                 const index = user.createdRequests.indexOf(requestId);
                 user.createdRequests.splice(index, 1);
             }
             if ( user.interestedRequests.includes(requestId)) {
                 const index = user.interestedRequests.indexOf(requestId);
                 user.interestedRequests.splice(index, 1);
             }
            const userUpdatestatus = await userDao.updateProfileDao(user._id, user)
            const requestUpdatestatus = await requestDao.deleteRequestDao(requestId)
        }
        res.json(request)
    }

    app.post('/request/:uid', createRequest)
    app.get('/requests', findAllRequests)
    app.put('/updateRequestLikes/:rid/:uid', updateRequestLikes);
    app.put('/updateRequestInterests/:rid/:uid', updateRequestInterests);
    app.get('/getInterestedDonorsOfRequest/:rid', getInterestedDonorsOfRequest)
    app.delete('/deleteRequest/:rid', deleteRequest)
}

export default RequestsController