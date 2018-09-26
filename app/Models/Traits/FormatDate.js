'use strict'

const moment = require('moment')

class FormatDate {
  register (Model) {
    const dateFormat = Model.dateFormat || 'DD.MM.YYYY'
    const dateTimeFormat = Model.dateTimeFormat || 'DD.MM.YYYY HH:mm'

    Model.formatDates = function formatDates (field, value) {
      if (field.slice(-3) === '_on') {
        return moment(value, dateFormat).format()
      }

      if (field.slice(-3) === '_at') {
        return moment(value, dateTimeFormat).format()
      }
    }

    Model.castDates = function castDates (field, value) {
      if (field.slice(-3) === '_on') {
        return value.format(dateFormat)
      }

      if (field.slice(-3) === '_at') {
        return value.format(dateTimeFormat)
      }
    }
  }
}

module.exports = FormatDate
