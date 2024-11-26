import auth from "./auth.js"
import student from "./student.js"
import teacher from "./teacher.js"

const Router = (server) => {

    server.get('/', (req, res) => {
        res.send("The server is working correctly for testing purposes")
    })

    server.use('/auth', auth)
    server.use('/student', student);
    server.use('/teacher', teacher)
}

export default Router