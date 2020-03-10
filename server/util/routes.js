const Router = require('express')
const data = require('@controllers/csvController')

const router = Router()

router.get('/', (req, res) => res.send('welcome to root'))
router.get('/data/normal/:year/:course/:grade/:levels', data.getAllNormal)
router.get('/data/E2E/:year/:course/:grade/:levels', data.getAllE2E)
router.get('/data/firsts/:year/:course/:grade/:levels', data.getAllFirsts)
router.get('/courses', data.getCourses)
router.get('/datahandler', data.test)

module.exports = router
