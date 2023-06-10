const mapDBToModel = ({ id, name, year }) => ({
  id,
  name,
  year,
});

const mapDBSongToModel = ({ id, title, performer }) => ({
  id,
  title,
  performer,
});

const transformedData = {};
const mapAlbumWithSongs = ({ album_id, album_name, album_year, ...songs }) => ({
  id: album_id,
  name: album_name,
  year: album_year,
  songs: [songs],
});

module.exports = { mapDBToModel, mapDBSongToModel, mapAlbumWithSongs };
