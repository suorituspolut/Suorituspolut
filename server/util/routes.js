const Router = require('express')
const data = require('@controllers/csvController')

const router = Router()

router.get('/', (req, res) => res.send('welcome to root'))
router.get('/data/normal/:year/:course/:grade', data.getAllNormal)
router.get('/data/E2E/:year/:course/:grade', data.getAllE2E)
router.get('/data/firsts/:year/:course/:grade', data.getAllFirsts)
router.get('/courses', data.getCourses)
router.get('/datahandler', data.test)
router.get('/histogram/:course', data.getHistogramData)

module.exports = router
