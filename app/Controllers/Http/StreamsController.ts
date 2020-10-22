/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Killian Tornese & Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stream from 'App/Models/Stream'
import Twitch from 'App/Helpers/Twitch'
import StreamTransformer, { SerializedStream } from 'App/Transformers/StreamTransformer'

export default class StreamsController {
  public async index ({ response }: HttpContextContract) {
    const streams = await Stream.query().orderBy('username')
    const twitchStreams = await Twitch.getStreams(streams.map(x => x.twitchId))
    const serializedStreams = streams.map(channel => channel.toJSON()) as SerializedStream[]

    return response.json(StreamTransformer.transformCollection(serializedStreams, twitchStreams))
  }

  public async show ({ params, response }: HttpContextContract) {
    const stream = await Stream.findOrFail(params.id)
    const twitchStream = await Twitch.getStreams([stream.twitchId])
    const serializedStream = stream.toJSON() as SerializedStream

    return response.json(StreamTransformer.transform(serializedStream, twitchStream))
  }
}
