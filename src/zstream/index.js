var BASE_URL = "https://4khdhub.click";
var TMDB_KEY = "439c478a771f35c05022f9feabcca01c";
var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

async function getStreams(tmdbId, mediaType, season, episode) {
  const streams = [];
  try {
    const headers = { "User-Agent": UA };
    const tmdbUrl = mediaType === "movie"
      ? "https://api.themoviedb.org/3/movie/" + tmdbId + "?api_key=" + TMDB_KEY
      : "https://api.themoviedb.org/3/tv/" + tmdbId + "?api_key=" + TMDB_KEY;
    const tmdbRes = await fetch(tmdbUrl, { headers });
    const tmdbData = await tmdbRes.json();
    const title = tmdbData.title || tmdbData.name || "";
    const searchUrl = BASE_URL + "/search?q=" + encodeURIComponent(title);
    const searchRes = await fetch(searchUrl, { headers });
    const searchHtml = await searchRes.text();
    const m3u8Links = searchHtml.match(/https?:\/\/[^\s"']+\.m3u8[^\s"']*/g);
    if (m3u8Links) {
      m3u8Links.forEach(function(link, i) {
        streams.push({ name: "ZStream", title: "4K Stream " + (i+1), url: link, quality: "4K" });
      });
    }
  } catch (e) {
    console.log("Error:", e.message);
  }
  return streams;
}
module.exports = { getStreams };
