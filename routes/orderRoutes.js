const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')


router.post('/add', orderController.addOrder)
router.put('/edit', orderController.editOrder)
router.get('/', orderController.getOrder)

module.exports = router