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
  viewers?: number,
  status?: string,
  game?: string,
  preview?: string,
}

class StreamTransformer {
  public transform (stream: SerializedStream, twitchStreams: TwitchStream[]) {
    if (twitchStreams && twitchStreams[stream.username] !== undefined) {
      const twitchStream: TwitchStream = twitchStreams[stream.username]

      stream.is_live = true
      stream.viewers = twitchStream.viewer_count
      stream.game = twitchStream.game_name
      stream.preview = twitchStream.thumbnail_url.replace('{width}', '320').replace('{height}', '180')
    } else {
      stream.is_live = false
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
