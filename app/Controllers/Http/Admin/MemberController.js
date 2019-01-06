'use strict'

/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz
 */

const Member = use('App/Models/Member')

class MemberController {
  index () {
    return Member.query().orderBy('nickname').fetch()
  }

  show ({ params }) {
    return Member.findOrFail(params.id)
  }

  store ({ request }) {
    return Member.create(this.$getFormField(request))
  }

  async update ({ params, request, response }) {
    const member = await Member.findOrFail(params.id)

    member.merge(this.$getFormField(request))
    await member.save()

    return response.noContent()
  }

  $getFormField (request) {
    return request.only([
      'nickname', 'lastname', 'firstname', 'contract', 'picture',
      'birth_on', 'clothes_size', 'phone_number', 'address', 'postal_code', 'city',
      'iban', 'rib', 'swift',
      'facebook', 'twitter', 'twitch', 'youtube', 'battletag', 'steam',
    ])
  }
}

module.exports = MemberController
