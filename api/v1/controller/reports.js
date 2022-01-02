const { ReportService } = require("../services/reportService")
const { asynchronously } = require("../services/utils")
exports.createReport = async (req, res, next) => {
    const report = new ReportService()
    const [error, newReport] = await report.createReport(req.body)
    if (!newReport) return res.status(400).json({ message: "Report create failed. Created report not found." })
    if (error) return res.status(400).json({ message: "Report create failed. Internal Server error." })
    res.status(200).json({ message: "Report created successfully.", newReport })
}
exports.updateReport = async (req, res, next) => {
    const report = new ReportService()
    const { name } = req.query
    const query = { name }
    const [error, newReport] = await report.updateReport(query, req.body)
    if (!newReport) return res.status(400).json({ message: "Report update failed" })
    if (error) return res.status(400).json({ message: "Report update failed. Internal Server error." })
    res.status(200).json({ message: "Report updated successfully.", newReport })
}
exports.sendReport = async (req, res, next) => {
    const report = new ReportService()
    const [error, newReport] = await report.sendReport({ name: req.query.name })
    if (!newReport) return res.status(400).json({ message: "Report send failed. Report doesn't  exist." })
    if (error) return res.status(400).json({ message: "Report send failed. Server error occured." })
    res.status(200).json({ message: "Report send successfully.", newReport })
}
