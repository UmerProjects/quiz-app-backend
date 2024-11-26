import express from 'express'
import { Login, Logout, Register} from '../controllers/auth.js'

const auth = express.Router()


auth.post('/register', Register)

auth.post('/login', Login)

auth.get('/logout', Logout)

export default auth;