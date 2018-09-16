'use strict'

const got = require('got')
const moment = require('moment')
const Article = use('App/Models/Article')
const { Command } = require('@adonisjs/ace')
const ArticleCategory = use('App/Models/ArticleCategory')

class ImportArticles extends Command {
  static get signature () {
    return 'import:articles'
  }

  static get description () {
    return 'Import old eLS articles'
  }

  async handle (args, options) {
    this.info('Fetching old articles...')

    let [categories, response] = await Promise.all([
      ArticleCategory.all(),
      got('https://www.lausanne-esports.ch/api/articles')
    ])

    const articles = JSON.parse(response.body)
    categories = categories.toJSON()

    this.info('Starting the import...')

    articles.forEach(async (article) => {

      try {
        const newCategory = categories.find(c => c.code === article.game)
        const newArticle = await Article.create({
          thumbnail: article.picture_card_url,
          featured_thumbnail: article.picture_featured_url,
          category_id: newCategory ? newCategory.id : 1,
          published_at: moment(article.released_at).format('DD.MM.YYYY H:mm'),
          template_id: 1,
        })

        await newArticle.translations().create({
          headline: article.title,
          body: article.content,
          view_count: article.view_count,
          language_id: 1,
          state_id: 4,
        })
      } catch (e) {
        console.log(e)
      }
    })

    this.success('All articles have been imported!')
  }
}

module.exports = ImportArticles
