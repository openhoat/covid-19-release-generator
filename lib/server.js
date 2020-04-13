const express = require('express')
const moment = require('moment')
const { dateString, timeString, toExpressMiddleware } = require('./helper')
const { generatePdf } = require('./generator')

const port = process.env.PORT || 3000

const app = express()

const requestHandler = async (req, res) => {
  const now = moment()
  const data = {
    releaseDate: dateString(now),
    releaseTime: timeString(now),
    ...req.query,
  }
  const { reasons, ...profile } = data
  const pdfBytes = await generatePdf(profile, reasons)
  res.type('pdf')
  res.set('Content-Length', pdfBytes.length)
  res.set('Content-Disposition', 'attachment; filename=covid-19-attestation.pdf')
  res.end(Buffer.from(pdfBytes))
}

app.get('/', toExpressMiddleware(requestHandler))

app.listen(port, () => {
  console.log(`Covid-19 release certificate server started on port ${port}`)
})
