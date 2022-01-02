const { sendReport, createReport, updateReport } = require('../controller/reports')
const router = require('express').Router()
router
    .patch('/', sendReport)
    .post('/',createReport)
    .get('/', (req, res) => { res.status().json({ message: "Reports application running healthy." }) })
    .get('/:id', (req, res) => { res.status().json({ message: "Reports application running healthy." }) })
    .put('/', updateReport)
    .delete('/:id', (req, res) => { res.status().json({ message: "Reports application running healthy." }) })

module.exports = router