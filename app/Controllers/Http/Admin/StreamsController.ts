/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StreamTransformer, { SerializedStream } from 'App/Transformers/StreamTransformer'
import Stream from 'App/Models/Stream'
import Twitch from 'App/Helpers/Twitch'
import StreamValidator from 'App/Validators/StreamValidator'

export default class StreamsController {
  public async index ({ response }: HttpContextContract) {
    const streams = await Stream.query().orderBy('username')
    const twitchStreams = await Twitch.getStreams(streams.map(x => x.twitchId))
    const serializedStreams = streams.map(channel => channel.toJSON()) as SerializedStream[]

    return response.json(StreamTransformer.transformCollection(serializedStreams, twitchStreams))
  }

  public async show ({ params, response }) {
    const stream = await Stream.findOrFail(params.id)

    return response.json(stream)
  }

  public async store ({ request, response }: HttpContextContract) {
    try {
      const { username } = await request.validate(StreamValidator)
      const channel = await Twitch.getChannel(username)

      await Stream.create({
        twitchId: Number(channel._id),
        username: channel.name,
        displayName: channel.display_name,
      })

      return response.noContent()
    } catch (e) {
      return response.status(400).send(e)
    }
  }

  public async update ({ params, request, response }: HttpContextContract) {
    try {
      const { username } = await request.validate(StreamValidator)
      const stream = await Stream.findOrFail(params.id)
      const channel = await Twitch.getChannel(username)

      stream.merge({
        twitchId: Number(channel._id),
        username: username,
        displayName: channel.display_name,
      })

      await stream.save()

      return response.noContent()
    } catch (e) {
      return response.status(400).send(e)
    }
  }

  public async destroy ({ params, response }) {
    await Stream.query().where('id', params.id).delete()

    return response.noContent()
  }
}
