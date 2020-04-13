const { join } = require('path')
const { readFile } = require('fs').promises
const { PDFDocument, StandardFonts } = require('pdf-lib')
const { toDataURL } = require('qrcode')
const { dateString, idealFontSize, timeString, } = require('./helper')

const generator = {
  pdfTemplateFile: join(__dirname, '..', 'assets', 'attestation_base.pdf'),
  generateQR: async (data) => {
    const {
      creationDate,
      creationHour,
      firstname,
      lastname,
      birthday,
      birthplace,
      address,
      zipcode,
      town,
      releaseDate,
      releaseTime,
      reasons,
    } = data
    const qrData = [
      `Crée le: ${creationDate} à ${creationHour}`,
      `Nom: ${lastname}`,
      `Prénom: ${firstname}`,
      `Naissance: ${birthday} à ${birthplace}`,
      `Adresse: ${address} ${zipcode} ${town}`,
      `Sortie: ${releaseDate} à ${releaseTime}`,
      `Motifs: ${reasons}`,
    ]
    const qrDataString = qrData.join('; ')
    const opts = {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
    }
    return toDataURL(qrDataString, opts)
  },
  generatePdf: async (profile, reasons = ['sport']) => {
    const creationDate = dateString()
    const creationHour = timeString()
    const {
      firstname = 'John',
      lastname = 'Doe',
      birthday = '01/02/1993',
      birthplace = 'Paris',
      address = '3 rue du Chmoll',
      zipcode = '75011',
      town = 'Paris',
      releaseDate = creationDate,
      releaseTime = creationHour,
    } = profile
    const releaseHours = String(releaseTime).substring(0, 2)
    const releaseMinutes = String(releaseTime).substring(3, 5)
    const data = {
      creationDate,
      creationHour,
      ...profile,
      reasons,
      releaseDate,
      releaseTime,
    }
    const pdf = await readFile(generator.pdfTemplateFile)
    const pdfDoc = await PDFDocument.load(pdf)
    const page1 = pdfDoc.getPages()[0]
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const drawText = (text, x, y, size = 11) => {
      page1.drawText(text, { x, y, size, font })
    }
    drawText(`${firstname} ${lastname}`, 123, 686)
    drawText(birthday, 123, 661)
    drawText(birthplace, 92, 638)
    drawText(`${address} ${zipcode} ${town}`, 134, 613)
    if (reasons.includes('travail')) {
      drawText('x', 76, 527, 19)
    }
    if (reasons.includes('courses')) {
      drawText('x', 76, 478, 19)
    }
    if (reasons.includes('sante')) {
      drawText('x', 76, 436, 19)
    }
    if (reasons.includes('famille')) {
      drawText('x', 76, 400, 19)
    }
    if (reasons.includes('sport')) {
      drawText('x', 76, 345, 19)
    }
    if (reasons.includes('judiciaire')) {
      drawText('x', 76, 298, 19)
    }
    if (reasons.includes('missions')) {
      drawText('x', 76, 260, 19)
    }
    const locationSize = idealFontSize(font, town, 83, 7, 11) || 7
    drawText(town, 111, 226, locationSize)
    if (reasons && reasons.length) {
      drawText(`${releaseDate}`, 92, 200)
      drawText(releaseHours, 200, 201)
      drawText(releaseMinutes, 220, 201)
    }
    drawText('Date de création:', 464, 150, 7)
    drawText(`${creationDate} à ${creationHour}`, 455, 144, 7)
    const generatedQR = await generator.generateQR(data)
    const qrImage = await pdfDoc.embedPng(generatedQR)
    page1.drawImage(qrImage, {
      x: page1.getWidth() - 170,
      y: 155,
      width: 100,
      height: 100,
    })
    pdfDoc.addPage()
    const page2 = pdfDoc.getPages()[1]
    page2.drawImage(qrImage, {
      x: 50,
      y: page2.getHeight() - 350,
      width: 300,
      height: 300,
    })
    return pdfDoc.save()
  },
}

module.exports = generator
