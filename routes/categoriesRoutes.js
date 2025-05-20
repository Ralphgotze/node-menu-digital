const express = require('express')
const router = express.Router()
const categoriesController = require('../controllers/categoriesController')


router.post('/add', categoriesController.addCategory)
router.put('/edit', categoriesController.editCategory)
router.get('/', categoriesController.getCategory)
router.delete('/delete', categoriesController.deleteCategory)

module.exports = router