/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Killian Tornese & Valentin Kaelin
 */

import got from 'got'
import Env from '@ioc:Adonis/Core/Env'
import Cache from 'App/Helpers/Cache'

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

export interface TwitchOAuth {
  access_token: string;
  expires_in: number;
  token_type: string;
}

class Twitch {
  private async getToken () {
    if (Cache.has('twitch.token') && !Cache.isExpired('twitch.token', 4000000)) {
      return Cache.get('twitch.token')
    }

    const { access_token: token }: TwitchOAuth = await got
      .post('https://id.twitch.tv/oauth2/token', {
        searchParams: {
          client_id: Env.get('TWITCH_API_KEY'),
          client_secret: Env.get('TWITCH_API_SECRET'),
          grant_type: 'client_credentials',
        },
        responseType: 'json',
      })
      .json()

    Cache.set('twitch.token', token)

    return token
  }

  private async defaultOptions () {
    const accessToken = await this.getToken()

    return {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-ID': Env.get('TWITCH_API_KEY'),
      },
      responseType: 'json',
    } as Object
  }

  public async getChannel (channel: string) {
    const { data }: { data: TwitchUser[] } = await got
      .get(
        `https://api.twitch.tv/helix/users?login=${channel}`,
        await this.defaultOptions()
      )
      .json()

    return data[0]
  }

  public async getStreams (usernames: string[]) {
    try {
      const { data }: { data: TwitchStream[] } = await this.getCached(
        `https://api.twitch.tv/helix/streams?user_login=${usernames.join(
          '&user_login='
        )}&limit=100`,
        await this.defaultOptions())

      return data.reduce((streams: TwitchStream[], stream: TwitchStream) => {
        streams[stream.user_login] = stream
        return streams
      }, [])
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
