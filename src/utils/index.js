const mapAlbumWithSongs = (albumSongs) => {
  const result = {
    id: albumSongs[0].album_id,
    name: albumSongs[0].album_name,
    year: albumSongs[0].album_year,
    songs:
      albumSongs[0].id === null
        ? []
        : albumSongs.map((song) => ({
          id: song.id,
          title: song.title,
          performer: song.performer,
        })),
  };
  return result;
};

module.exports = {
  mapAlbumWithSongs,
};
