/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Killian Tornese & Valentin Kaelin
 */

import { TwitchStream } from 'App/Helpers/Twitch'

export interface SerializedStream {
  id: number,
  created_at: string,
  updated_at: string,
  twitch_id: number,
  username: string,
  display_name: string,
  is_live?: boolean,
  is_partner?: boolean,
  logo?: string,
  viewers?: number,
  status?: string,
  game?: string,
  preview?: string,
}

class StreamTransformer {
  public transform (stream: SerializedStream, twitchStreams: TwitchStream[]) {
    if (twitchStreams && twitchStreams[stream.username] !== undefined) {
      const twitchStream = twitchStreams[stream.username]

      stream.is_live = true
      stream.is_partner = twitchStream.channel.partner
      stream.logo = twitchStream.channel.logo
      stream.viewers = twitchStream.viewers
      stream.status = twitchStream.channel.status
      stream.game = twitchStream.game
      stream.preview = twitchStream.preview.large
    } else {
      stream.is_live = false
      stream.is_partner = false
      stream.logo = ''
      stream.status = ''
      stream.viewers = 0
      stream.game = ''
      stream.preview = ''
    }

    return stream
  }

  public transformCollection (streams: SerializedStream[], twitchStreams: TwitchStream[]) {
    return streams.map(stream => this.transform(stream, twitchStreams))
  }
}

export default new StreamTransformer()
