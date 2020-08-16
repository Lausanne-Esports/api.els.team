import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Stream from 'App/Models/Stream'
import Twitch from 'App/Helpers/Twitch'
import { StreamTwitch } from 'App/Helpers/Twitch'

export default class StreamsController {
  private mergeTwitchData (channels: any[], streams: StreamTwitch[]) {
    channels.forEach((channel) => {
      if (streams && streams[channel.username] !== undefined) {
        const stream = streams[channel.username]

        channel.is_live = true
        channel.is_partner = stream.channel.partner
        channel.logo = stream.channel.logo
        channel.viewers = stream.viewers
        channel.status = stream.channel.status
        channel.game = stream.game
        channel.preview = stream.preview.large
      } else {
        channel.is_live = false
        channel.is_partner = false
        channel.logo = ''
        channel.status = ''
        channel.viewers = 0
        channel.game = ''
        channel.preview = ''
      }
    })
    return channels
  }

  public async index ({}: HttpContextContract) {
    const channels = await Stream.query().orderBy('username')
    const streams = await Twitch.getStreams(channels.map(x => x.username))

    return this.mergeTwitchData(channels.map(channel => channel.toJSON()), streams)
  }

  public async show ({ params }: HttpContextContract) {
    const channel = await Stream.findOrFail(params.id)
    const stream = await Twitch.getStreams([channel.username])

    return this.mergeTwitchData([channel.toJSON()], stream)[0]
  }
}
