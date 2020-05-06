const Router = require('express')
const data = require('@controllers/csvController')

const router = Router()


router.get('/', (req, res) => res.send('welcome to root'))
router.get('/courses', data.getCourseData)
router.get('/simplesankey/:year/:course/:grade/', data.getSimpleSankeyData)
router.get('/multisankey/:year/:levels/', data.getMultiSankeyData)
router.get('/bubbles/:year/:grade/:bubbles/:track', data.getBubbleData)
router.get('/simplehistogram/:course', data.getSimpleHistogramData)
router.get('/multihistogram/:sorting/:subset', data.getMultiHistogramData)
router.get('/recommendationsgrade/:year/:course/:uniqueness/:studytrack', data.getRecommendationGradeData)
router.get('/recommendationstime/:year/:term/:studentNumber/:goalYears', data.getRecommendationTimeData)
router.get('/studytracks', data.getStudyData)


module.exports = router
