const express = require('express')
const router = express.Router()

const { create, list, update, remove } = require('../controllers/todos')

router.get('/', list)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

module.exports = router
