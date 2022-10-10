import { BaseCommand } from '@adonisjs/core/build/standalone'
import { readFile, writeFile, readdir } from 'fs/promises'
import mjml2html from 'mjml'

export default class MjmlBuild extends BaseCommand {
  public static commandName = 'mjml:build'
  public static description = 'Convert mjml emails to edge views'

  private async getEmailFiles () {
    const files = await readdir(this.application.makePath('resources/emails'))

    return files
      .filter(file => file.endsWith('.mjml'))
      .map(file => `${this.application.makePath('resources/emails/')}${file}`)
  }

  private async compileFile (file: string) {
    const content = await readFile(file, 'utf8')
    const { html } = mjml2html(content, {
      keepComments: false,
      minify: false,
    })

    const baseName = file.replace(this.application.makePath('resources/emails/'), '').replace('.mjml', '.edge')
    await writeFile(this.application.makePath(`resources/views/emails/${baseName}`), html)
    this.logger.success(`Created email ${baseName}`)
  }

  public async handle () {
    const files = await this.getEmailFiles()
    await Promise.all(files.map(file => this.compileFile(file)))
  }
}
