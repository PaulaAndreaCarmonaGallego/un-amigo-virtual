/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UserController from '#controllers/UserController'
import WhatsappsController from '#controllers/whatsapps_controller'

import { middleware } from '#start/kernel'
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/test', [ UserController, 'test' ]).use(middleware.TokenMiddleware)
router.get('/receive', [ WhatsappsController, 'receive'])

