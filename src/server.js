const Hapi = require('@hapi/hapi');
const { testConnection } = require('./db');
const albums = require('./api/albums');
const songs = require('./api/songs');
const AlbumsService = require('./services/AlbumsService');
const AlbumsValidator = require('./validator/albums');
const SongsService = require('./services/SongsService');
const SongsValidator = require('./validator/songs');
require('dotenv').config();

const init = async () => {
  const isConnectedToDb = await testConnection();
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
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
      validator: AlbumsValidator,
    },
  });
  await server.register({
    plugin: songs,
    options: {
      service: songsService,
      validator: SongsValidator,
    },
  });
  if (isConnectedToDb) {
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
  } else {
    process.exit(1);
  }
};

init();
