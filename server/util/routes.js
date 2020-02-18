const Router = require('express')
const data = require('@controllers/csvController')

const router = Router()

router.get('/', (req, res) => res.send('welcome to root'))
router.get('/data', data.getAll)
router.get('/datahandler', data.test)

module.exports = router
