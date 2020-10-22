/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import Event from '@ioc:Adonis/Core/Event'

Event.on('new:user', 'SendEmailVerificationEmail.handleRegistration')
Event.on('password:request', 'SendPasswordRequestEmail.method')
