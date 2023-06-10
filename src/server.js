const Hapi = require('@hapi/hapi');
const albums = require('./api/albums')
const AlbumsService = require('./services/AlbumsService')
const AlbumsValidator = require('./validator/albums')
require('dotenv').config();

const init = async () => {
  const albumsService = new AlbumsService()
  const server = Hapi.Server({
    port: process.env.PORT,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => 'Hello world!',
  });

  await server.register({
    plugin: albums,
    options: {
      service: albumsService,
      validator: AlbumsValidator
    }
  })
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
