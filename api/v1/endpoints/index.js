const router = require('express').Router()
router.use('/reports', require('./reports'))
module.exports = router