const Router = require('express')
const data = require('@controllers/csvController')

const router = Router()

router.get('/', (req, res) => res.send('welcome to root'))
router.get('/data/normal/:year/:course/:grade/:levels/:bubbles', data.getAllNormal)
router.get('/data/firsts/:year/:course/:grade/:levels/:bubbles', data.getAllFirsts)
router.get('/data/bubble/:year/:course/:grade/:levels/:bubbles', data.getBubbleData)
router.get('/courses', data.getCourses)
router.get('/histogram/:course', data.getHistogramData)
router.get('/histomany', data.getHistogramDataMany)

module.exports = router
