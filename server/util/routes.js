const Router = require('express')
const data = require('@controllers/csvController')

const router = Router()

router.get('/', (req, res) => res.send('welcome to root'))
router.get('/data/normal/:year/:course/:grade/:levels', data.getAllNormal)
router.get('/data/E2E/:year/:course/:grade/:levels', data.getAllE2E)
router.get('/data/firsts/:year/:course/:grade/:levels', data.getAllFirsts)
router.get('/data/bubble/:year/:course/:grade/:levels', data.getBubbleData)
router.get('/courses', data.getCourses)

module.exports = router
