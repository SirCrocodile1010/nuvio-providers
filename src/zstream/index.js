async function getStreams(tmdbId, mediaType, season, episode) {
  const streams = [];
  try {
    let url;
    if (mediaType === "movie") {
      url = `https://vidlink.pro/movie/${tmdbId}`;
    } else {
      url = `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}`;
    }
    streams.push({
      name: "ZStream",
      title: "VidLink HD",
      url: url,
      quality: "HD",
      type: "embed"
    });
  } catch (e) {
    console.log("Error:", e.message);
  }
  return streams;
}
module.exports = { getStreams };
