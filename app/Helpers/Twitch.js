'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Killian Tornese
 */

const got = require('got')
const Config = use('Config')
const Cache = use('App/Helpers/Cache')

const defaultOptions = {
  headers: { 'Client-ID': Config.get('twitch.apiKey') },
  json: true,
}

class Twitch {
  async getChannel (channel) {
    const response = await got.get(`https://api.twitch.tv/kraken/channels/${channel}`, defaultOptions)

    return response.body
  }

  async getStreams (channels) {
    const { streams } = await this.getCached(`https://api.twitch.tv/kraken/streams/?channel=${channels.join()}&limit=100`, defaultOptions)

    return streams.reduce((streams, stream) => {
      streams[stream.channel.name] = stream
      return streams
    }, {})
  }

  async getCached (url, options = {}) {
    if (Cache.has(`twitch.${url}`)) {
      const [stream, timestamp] = Cache.get(`twitch.${url}`)

      if ((Date.now() - timestamp) / 1000 < 60) {
        return stream
      }
    }

    const response = await got.get(url, options)

    Cache.set(`twitch.${url}`, [response.body, Date.now()])

    return response.body
  }
}

module.exports = new Twitch
