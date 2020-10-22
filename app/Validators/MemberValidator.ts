/**
 * Lausanne-Sport eSports API Source Code.
 *
 * @license GPLv3
 * @copyright Lausanne-Sport eSports - Romain Lanz & Valentin Kaelin
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class MemberValidator {
  constructor (private ctx: HttpContextContract) {
  }

  /**
   * Defining a schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    nickname: schema.string(),
    lastname: schema.string.optional(),
    firstname: schema.string.optional(),
    birth_on: schema.date.optional(),
    picture: schema.string.optional(),

    contract: schema.string.optional(),
    iban: schema.string.optional(),
    rib: schema.string.optional(),
    swift: schema.string.optional(),

    clothes_size: schema.string.optional(),
    phone_number: schema.string.optional(),
    address: schema.string.optional(),
    postal_code: schema.string.optional(),
    city: schema.string.optional(),

    battletag: schema.string.optional(),
    facebook: schema.string.optional(),
    steam: schema.string.optional(),
    twitch: schema.string.optional(),
    twitter: schema.string.optional(),
    youtube: schema.string.optional(),
  })

  /**
   * The `schema` first gets compiled to a reusable function and then that compiled
   * function validates the data at runtime.
   *
   * Since, compiling the schema is an expensive operation, you must always cache it by
   * defining a unique cache key. The simplest way is to use the current request route
   * key, which is a combination of the route pattern and HTTP method.
   */
  public cacheKey = this.ctx.routeKey

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
  */
  public messages = {}
}
