const express = require('express')
const router = express.Router()
const tablesController = require('../controllers/tablesController')


router.post('/add', tablesController.addTable)
router.put('/edit', tablesController.editTable)
router.get('/', tablesController.getTable)
router.delete('/delete', tablesController.deleteTable)

module.exports = router