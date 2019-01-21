'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Killian Tornese
 */

const got = require('got');
const md5 = require('js-md5');

const Cache = use('App/Helpers/Cache');

class Twitch {

  async getChannel(channel) {
    const resp = await got.get(`https://api.twitch.tv/kraken/channels/${channel}`, {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT
      },
      json: true,
    });

    return resp.body;
  }

  async getStreams(channels) {
    const json = await this.getCached(`https://api.twitch.tv/kraken/streams/?channel=${channels.join()}&limit=100`, {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT
      },
      json: true,
    }).catch(function(error) {
      return { streams: [] };
    });

    let streams = {};
    json.streams.forEach(stream => {
      streams[stream.channel.name] = stream;
    });

    return streams;
  }

  async getCached(url, options = {}) {

    if(Cache.has(md5(url))) {
      const data = Cache.get(md5(url));
      if((new Date().getTime() - data[1]) / 1000 < 60) {
        return data[0];
      }
    }

    const resp = await got.get(url, options);

    Cache.set(md5(url), [resp.body, Date.now()]);
    return resp.body;
  }

}

module.exports = new Twitch;
