import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class TokenMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */

    if (!ctx.request.header('api-token')) {
      throw new Error('Invalid credential')
    }
    next()
    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
