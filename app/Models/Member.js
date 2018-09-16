'use strict'

const Model = use('Model')
const moment = require('moment')

class Member extends Model {
  static get dates () {
    return super.dates.concat(['birth_on'])
  }

  static formatDates (field, value) {
    if (field.slice(-3) === '_on') {
      return moment(value, 'DD.MM.YYYY').format()
    }

    if (field.slice(-3) === '_at') {
      return moment(value, 'DD.MM.YYYY H:mm').format()
    }
  }

  static castDates (field, value) {
    if (field.slice(-3) === '_on') {
      return value.format('DD.MM.YYYY')
    }

    if (field.slice(-3) === '_at') {
      return value.format('DD.MM.YYYY H:mm')
    }
  }
}

module.exports = Member
