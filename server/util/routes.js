const Router = require('express')
const data = require('@controllers/csvController')

const router = Router()

router.get('/', (req, res) => res.send('welcome to root'))
router.get('/data/normal', data.getAllNormal)
router.get('/data/E2E', data.getAllE2E)
router.get('/courses', data.getCourses)
router.get('/datahandler', data.test)

module.exports = router
