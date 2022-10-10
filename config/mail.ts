/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 *
 * Config source: https://git.io/JvgAf
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { MailConfig } from '@ioc:Adonis/Addons/Mail'

const mailConfig: MailConfig = {
  /*
  |--------------------------------------------------------------------------
  | Default mailer
  |--------------------------------------------------------------------------
  |
  | The following mailer will be used to send emails, when you don't specify
  | a mailer
  |
  */
  mailer: 'smtp',

  /*
  |--------------------------------------------------------------------------
  | Mailers
  |--------------------------------------------------------------------------
  |
  | You can define or more mailers to send emails from your application. A
  | single `driver` can be used to define multiple mailers with different
  | config.
  |
  | For example: Postmark driver can be used to have different mailers for
  | sending transactional and promotional emails
  |
  */
  mailers: {
    /*
    |--------------------------------------------------------------------------
    | Smtp
    |--------------------------------------------------------------------------
    |
    | Uses SMTP protocol for sending email
    |
    */
    smtp: {
      driver: 'smtp',
      host: Env.get('SMTP_HOST'),
      port: Env.get('SMTP_PORT'),
      auth: {
        user: Env.get('SMTP_USERNAME'),
        pass: Env.get('SMTP_PASSWORD'),
        type: 'login',
      },
    },

    /*
    |--------------------------------------------------------------------------
    | SES
    |--------------------------------------------------------------------------
    |
    | Uses Amazon SES for sending emails. You will have to install the aws-sdk
    | when using this driver.
    |
    | ```
    | npm i aws-sdk
    | ```
    |
    */
    ses: {
      driver: 'ses',
      apiVersion: '2010-12-01',
      key: Env.get('SES_ACCESS_KEY'),
      secret: Env.get('SES_ACCESS_SECRET'),
      region: Env.get('SES_REGION'),
      sslEnabled: true,
      sendingRate: 10,
      maxConnections: 5,
    },

    /*
    |--------------------------------------------------------------------------
    | Mailgun
    |--------------------------------------------------------------------------
    |
		| Uses Mailgun service for sending emails.
    |
    */
    mailgun: {
      driver: 'mailgun',
      baseUrl: 'https://api.mailgun.net/v3',
      domain: Env.get('MAILGUN_DOMAIN'),
      key: Env.get('MAILGUN_API_KEY'),
    },

    /*
    |--------------------------------------------------------------------------
    | SparkPost
    |--------------------------------------------------------------------------
    |
		| Uses Sparkpost service for sending emails.
    |
    */
    sparkpost: {
      driver: 'sparkpost',
      baseUrl: 'https://api.sparkpost.com/api/v1',
      key: Env.get('SPARKPOST_API_KEY'),
    },
  },
}

export default mailConfig
