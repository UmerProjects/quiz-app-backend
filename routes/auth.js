import express from 'express'
import { Login, Register} from '../controllers/auth.js'

const auth = express.Router()


auth.post('/register', Register)

auth.post('/login', Login)

export default auth;