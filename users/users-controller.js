import * as userDao from './users-dao.js'
import * as requestDao from '../requests/requests-dao.js'

const UsersController = (app) => {

    const register = async (req, res) => {
        const user = req.body;
        const existingUser = await userDao
            .findUserByUsername(user.username)
        if (existingUser) {
            res.sendStatus(403)
            return
        }
        const currentUser = await userDao.createUser(user)
        res.json(currentUser)
    }

    const login = async (req, res) => {
        const credentials = req.body
        const existingUser = await userDao
            .findUserByCredentials(
                credentials.username, credentials.password)
        if (existingUser) {
            req.session['currentUser'] = existingUser
            res.json(existingUser)
            return
        }
        res.sendStatus(403)
    }

    const logout = (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }

    const profile = (req, res) => {
        if (req.session['currentUser']) {
            res.send(req.session['currentUser'])
        } else {
            res.sendStatus(403)
        }
    }

    const pendingDonors = async (req, res) => {
        const pendingDonors = await userDao.findPendingDonors();
        res.json(pendingDonors)
    }

    const pendingNGOs = async (req, res) => {
        const pendingNGOs = await userDao.findPendingNGOs();
        res.json(pendingNGOs)
    }

    const approveUser = async (req, res) => {
        const userToUpdate = req.params.uid;
        const user = await userDao.findUserByUserId(userToUpdate);
        const status = await userDao.updateUserApproval(userToUpdate);
        res.json(user)
    }

    const updateProfile = async (req, res) => {
        const profileId = req.params.uid;
        const updates = req.body;
        const profile = await userDao.updateProfileDao(profileId, updates)
        const finalProfile = await userDao.findUserByUserId(profileId)
        req.session['currentUser'] = finalProfile
        res.json(finalProfile)
    }

    const getUser = async (req, res) => {
        const userName = req.params.username;
        const user = await userDao.findUserByUsername(userName)
        res.json(user)
    }

    const getProfileUser = async (req, res) => {
        const userName = req.params.username;
        const user = await userDao.findUserByUsername(userName)
        res.json(user)
    }

    const getUsers = async (req, res) => {
        const userName = req.params.username;
        const users = await userDao.findUsersByUsername(userName)
        res.json(users)
    }

    const getUserInterests = async (req, res) => {
        const userId = req.params.uid;
        const user = await userDao.findUserByUserId(userId)
        let interestedRequests = [];
        for(const reqid of user.interestedRequests) {
            const request = await requestDao.findRequestByRequestId(reqid);
            interestedRequests.push(request)
        }
        res.json(interestedRequests)
    }

    const getNGOInterestedDonors = async (req, res) => {
        const userId = req.params.uid;
        const ngoUser = await userDao.findUserByUserId(userId)
        let NGOInterestedDonors = [];
        let NGOInterestedDonorsIds = [];
        for(const reqid of ngoUser.createdRequests) {
            const request = await requestDao.findRequestByRequestId(reqid);
            for(const userid of request.interestedDonors) {
                const user = await userDao.findUserByUserId(userid);
                if (NGOInterestedDonorsIds.includes(user.username)===false) {
                    NGOInterestedDonorsIds.push(user.username)
                    NGOInterestedDonors.push(user)
                }
            }
        }
        res.json(NGOInterestedDonors)
    }

    app.post('/register', register);
    app.post('/login', login);
    app.post('/logout', logout);
    app.post('/profile', profile);
    app.get('/pendingDonors', pendingDonors);
    app.get('/pendingNGOs', pendingNGOs);
    app.post('/updateUser/:uid', approveUser);
    app.put('/updateProfile/:uid', updateProfile);
    app.get('/getUser/:username', getUser);
    app.get('/getProfileUser/:username', getProfileUser);
    app.get('/getUsers/:username', getUsers);
    app.get('/getUserInterests/:uid', getUserInterests);
    app.get('/getNGOInterestedDonors/:uid', getNGOInterestedDonors)
}

export default UsersController