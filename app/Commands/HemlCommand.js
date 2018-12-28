'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const path = use('path')
const klaw = use('klaw')
const Helpers = use('Helpers')
const { Command } = use('@adonisjs/ace')

class HemlCommand extends Command {
  static get signature () {
    return 'heml'
  }

  static get description () {
    return 'Convert heml emails to edge views'
  }

  async getEmailFiles () {
    return new Promise((resolve, reject) => {
      const files = []

      klaw(Helpers.resourcesPath('emails'))
        .on('data', function (item) {
          if (item.stats.isDirectory()) {
            return
          }

          if (['.heml'].indexOf(path.extname(item.path)) === -1) {
            return
          }
          files.push(item.path)
        })
        .on('end', () => resolve(files))
        .on('error', reject)
    })
  }

  async compileFile (file) {
    const heml = use('heml')

    const content = await this.readFile(file, 'utf-8')
    const { html, metadata, errors } = await heml(content, {
      juice: {}
    })

    if (errors.length) {
      console.log(errors)
      return
    }

    const baseName = file.replace(Helpers.resourcesPath('emails/'), '').replace('.heml', '.edge')
    await this.writeFile(Helpers.viewsPath(`emails/${baseName}`), html)
    console.log(`Created email ${this.chalk.dim(baseName)} with ${this.chalk.dim(metadata.subject)} subject`)
  }

  async handle ({ dev }, options) {
    const files = await this.getEmailFiles()
    await Promise.all(files.map((file) => {
      return this.compileFile(file)
    }))
  }
}

module.exports = HemlCommand
