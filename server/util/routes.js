const Router = require('express')
const data = require('@controllers/csvController')

const router = Router()


router.get('/', (req, res) => res.send('welcome to root'))
router.get('/courses', data.getCourses)
router.get('/sankey/normal/:year/:course/:grade/:levels/', data.getSankeyNormal)
router.get('/sankey/firsts/:year/:course/:grade/:levels/', data.getSankeyFirsts)
router.get('/bubbles/:year/:grade/:bubbles', data.getBubbleData)
router.get('/histogram/:course', data.getHistogramData)
router.get('/histomany/:sorting/:subset', data.getHistogramDataMany)
router.get('/rts/:course/:uniqueness', data.getRoadToSuccessData)
router.get('/recommendations/:year', data.getRecommendationData)


module.exports = router
