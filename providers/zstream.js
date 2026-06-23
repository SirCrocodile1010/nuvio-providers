/**
 * zstream - Built from src/zstream/
 * Generated: 2026-06-23T04:57:13.940Z
 */
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/zstream/index.js
var BASE_URL = "https://4khdhub.click";
var TMDB_KEY = "439c478a771f35c05022f9feabcca01c";
var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    const streams = [];
    try {
      const headers = { "User-Agent": UA };
      const tmdbUrl = mediaType === "movie" ? "https://api.themoviedb.org/3/movie/" + tmdbId + "?api_key=" + TMDB_KEY : "https://api.themoviedb.org/3/tv/" + tmdbId + "?api_key=" + TMDB_KEY;
      const tmdbRes = yield fetch(tmdbUrl, { headers });
      const tmdbData = yield tmdbRes.json();
      const title = tmdbData.title || tmdbData.name || "";
      const searchUrl = BASE_URL + "/search?q=" + encodeURIComponent(title);
      const searchRes = yield fetch(searchUrl, { headers });
      const searchHtml = yield searchRes.text();
      const m3u8Links = searchHtml.match(/https?:\/\/[^\s"']+\.m3u8[^\s"']*/g);
      if (m3u8Links) {
        m3u8Links.forEach(function(link, i) {
          streams.push({ name: "ZStream", title: "4K Stream " + (i + 1), url: link, quality: "4K" });
        });
      }
    } catch (e) {
      console.log("Error:", e.message);
    }
    return streams;
  });
}
module.exports = { getStreams };
