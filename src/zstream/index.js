async function getStreams(tmdbId, mediaType, season, episode) {
  const streams = [];
  try {
    var apiUrl;
    if (mediaType === 'movie') {
      apiUrl = 'https://vidsrc.me/embed/movie?tmdb=' + tmdbId;
    } else {
      apiUrl = 'https://vidsrc.me/embed/tv?tmdb=' + tmdbId + '&season=' + season + '&episode=' + episode;
    }
    var res = await fetch(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    var html = await res.text();
    var links = html.match(/https?://[^s"'<>]+.(m3u8|mp4)[^s"'<>]*/g);
    if (links) {
      links.forEach(function(link, i) {
        streams.push({ name: 'ZStream', title: 'Stream ' + (i+1), url: link, quality: 'HD' });
      });
    }
  } catch(e) {
    console.log('Error:', e.message);
  }
  return streams;
}
module.exports = { getStreams };
