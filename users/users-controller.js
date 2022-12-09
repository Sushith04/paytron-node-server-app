import * as userDao from './users-dao.js'

let currentUser = null

const UsersController = (app) => {

    const register = async (req, res) => {
        const user = req.body;
        console.log("In Register")
        const existingUser = await userDao
            .findUserByUsername(user.username)
        if(existingUser) {
            console.log("User exists")
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
        if(existingUser) {
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

    app.post('/register', register)
    app.post('/login', login)
    app.post('/logout', logout)
    app.post('/profile', profile)
    app.get('/pendingDonors', pendingDonors)
    app.get('/pendingNGOs', pendingNGOs)
    app.post('/updateUser/:uid', approveUser);
}

export default UsersController