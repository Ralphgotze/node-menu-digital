const express = require('express')
const router = express.Router()
const comidasController = require('../controllers/foodController')


router.post('/add', comidasController.addFood)
router.put('/edit', comidasController.editFood)
router.get('/', comidasController.getFood)
router.delete('/delete', comidasController.deleteFood)

module.exports = router