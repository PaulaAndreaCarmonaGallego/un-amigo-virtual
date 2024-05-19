import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {

  async test({ response }: HttpContext) {
    return response.json({
      token: 'Bearer euhdhdhdhdhdh.hdhdhd.hdhdhd',
    })
  }
}

