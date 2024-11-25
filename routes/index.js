import auth from "./auth.js"

const Router = (server) => {

    server.get('/', (req, res) => {
        res.send("The server is working correctly for testing purposes")
    })

    server.use('/auth', auth)
}

export default Router