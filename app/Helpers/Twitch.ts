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
  id: string;
  display_name: string;
  login: string;
}

export interface TwitchStream {
  id: string;
  user_login: string;
  user_name: string;
  game_name: string;
  viewer_count: number;
  thumbnail_url: string;
}

class Twitch {
  private async generateToken () {
    const { access_token: token }: { access_token: string } = await got.post('https://id.twitch.tv/oauth2/token', {
      searchParams: {
        client_id: Env.get('TWITCH_API_KEY'),
        client_secret: Env.get('TWITCH_API_SECRET'),
        grant_type: 'client_credentials',
      },
      responseType: 'json',
    }).json()

    return token
  }

  private async defaultOptions () {
    const accessToken = await this.generateToken()

    return {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-ID': Env.get('TWITCH_API_KEY'),
      },
      responseType: 'json',
    } as Object
  }

  public async getChannel (channel: string) {
    const accessToken = await this.generateToken()

    const { data }: { data: TwitchUser[] } = await got.get(`https://api.twitch.tv/helix/users?login=${channel}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-ID': Env.get('TWITCH_API_KEY'),
      },
      responseType: 'json',
    }).json()

    console.log(data)
    return data[0]
  }

  public async getStreams (usernames: string[]) {
    try {
      const options = await this.defaultOptions()
      const { data }: { data: TwitchStream[] } =
        await got.get(`https://api.twitch.tv/helix/streams?user_login=${usernames.join('&user_login=')}&limit=100`, options).json()

      return data.reduce((streams: TwitchStream[], stream: TwitchStream) => {
        streams[stream.user_login] = stream
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
