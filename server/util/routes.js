const Router = require('express')
const messages = require('@controllers/messagesController')
const data = require('@controllers/csvController')

const router = Router()

router.get('/', (req, res) => res.send('welcome to root'))
router.get('/data', data.getAll)
router.get('/datahandler', data.test)
router.get('/messages', messages.getAll)
router.post('/messages', messages.create)
router.get('/messages/:id', messages.getOne)
router.put('/messages/:id', messages.update)
router.delete('/messages/:id', messages.destroy)

module.exports = router
