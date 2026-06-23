async function getStreams(tmdbId, mediaType, season, episode) {
  const streams = [];
  try {
    let url;
    if (mediaType === "movie") {
      url = `https://vidsrc.xyz/embed/movie?tmdb=${tmdbId}`;
    } else {
      url = `https://vidsrc.xyz/embed/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}`;
    }

    const res = await fetch(url);
    const html = await res.text();

    const m3u8 = html.match(/https?:\/\/[^\s"']+\.m3u8[^\s"']*/g);
    if (m3u8) {
      m3u8.forEach((link, i) => {
        streams.push({
          name: "ZStream",
          title: `Stream ${i + 1}`,
          url: link,
          quality: "HD"
        });
      });
    }
  } catch (e) {
    console.log("Error:", e.message);
  }
  return streams;
}
module.exports = { getStreams };
