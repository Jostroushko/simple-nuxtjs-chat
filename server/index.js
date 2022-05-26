const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const {app, server} = require('./app')

// импорт и запуск Nuxt.js
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // инициализация Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // построит только в dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(nuxt.render)

  // прослушка сервера
  server.listen(port, () =>{
    consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
  })
}
start()
