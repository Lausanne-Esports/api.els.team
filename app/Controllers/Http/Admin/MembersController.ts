/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Member from 'App/Models/Member'
import MemberValidator from 'App/Validators/MemberValidator'

export default class MembersController {
  public async index ({ response }: HttpContextContract) {
    const members = await Member.query().orderBy('nickname')

    return response.json(members)
  }

  public async show ({params, response}: HttpContextContract) {
    const member = await Member.findOrFail(params.id)

    return response.json(member)
  }

  public async store ({request, response}: HttpContextContract) {
    const data = await request.validate(MemberValidator)
    await Member.create(data)

    return response.noContent()
  }

  public async update ({params, request, response}: HttpContextContract) {
    const data = await request.validate(MemberValidator)
    const member = await Member.findOrFail(params.id)

    member.merge(data)

    await member.save()

    return response.noContent()
  }
}
