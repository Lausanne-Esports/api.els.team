'use strict'

const Event = use('Event')

Event.on('user::created', 'SendEmailVerificationEmail.method')
Event.on('forgot::password', 'SendRequestPasswordEmail.method')
