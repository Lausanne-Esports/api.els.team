/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Killian Tornese & Valentin Kaelin
 */

import got from 'got'
import Env from '@ioc:Adonis/Core/Env'
import Cache from 'App/Helpers/Cache'

export interface Streamers {
  users: TwitchUser[];
}

export interface TwitchUser {
  _id: string;
  display_name: string;
  name: string;
}

export interface TwitchStream {
  channel: Channel;
  game: string;
  preview: Preview;
  viewers: number;
}

export interface Channel {
  name: string,
  logo: string;
  partner: boolean;
  status: string;
}

export interface Preview {
  large: string;
}

const defaultOptions: Object = {
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': Env.get('TWITCH_API_KEY') as string,
  },
  responseType: 'json',
}

class Twitch {
  public async getChannel (channel: string) {
    const data: Streamers = await got.get(`https://api.twitch.tv/kraken/users?login=${channel}`, defaultOptions).json()

    return data.users[0]
  }

  public async getStreams (twitchIds: number[]) {
    try {
      const { streams }: { streams: TwitchStream[] } = await this.getCached(`https://api.twitch.tv/kraken/streams/?channel=${twitchIds.join()}&limit=100`, defaultOptions)

      return streams.reduce((streams: TwitchStream[], stream: TwitchStream) => {
        streams[stream.channel.name] = stream
        return streams
      }, [] as TwitchStream[])
    } catch (e) {
      return []
    }
  }

  public async getCached (url: string, options = {}) {
    if (!Cache.has(`twitch.${url}`) || Cache.isExpired(`twitch.${url}`, 60)) {
      const response = await got.get(url, options)

      Cache.set(`twitch.${url}`, response.body)
    }

    return Cache.get(`twitch.${url}`)
  }
}

export default new Twitch()
