'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Event = use('Event')

Event.on('user::created', 'SendEmailVerificationEmail.method')
Event.on('forgot::password', 'SendRequestPasswordEmail.method')
