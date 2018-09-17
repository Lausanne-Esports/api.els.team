'use strict'

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
      'nickname', 'lastname', 'firstname', 'contract',
      'birth_on', 'clothes_size', 'address', 'postal_code', 'city',
      'iban', 'rib', 'swift',
      'facebook', 'twitter', 'twitch', 'youtube', 'battletag', 'steam',
    ])
  }
}

module.exports = MemberController
