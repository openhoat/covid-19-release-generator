const moment = require('moment-timezone')

const helper = {
  asCallback: (promise, cb) => {
    promise.then(
      value => {
        cb(null, value)
      },
      err => {
        cb(err)
      },
    )
  },
  dateParts: date => {
    const year = date.getFullYear()
    const month = helper.pad(date.getMonth() + 1)
    const day = helper.pad(date.getDate())
    return { year, month, day }
  },
  dateString: (from = helper.now()) => from.format('DD/MM/YYYY'),
  idealFontSize: (font, text, maxWidth, minSize, defaultSize) => {
    let currentSize = defaultSize
    let textWidth = font.widthOfTextAtSize(text, defaultSize)

    while (textWidth > maxWidth && currentSize > minSize) {
      textWidth = font.widthOfTextAtSize(text, --currentSize)
    }

    return (textWidth > maxWidth) ? null : currentSize
  },
  now: () => moment().tz('Europe/Paris'),
  pad: str => String(str).padStart(2, '0'),
  timeString: (from = helper.now()) => from.format('HH:mm').replace(':', 'h'),
  toExpressMiddleware: handler => (req, res, next) => {
    helper.asCallback(handler(req, res), next)
  },
}

module.exports = helper
