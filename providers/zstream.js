/**
 * zstream - Built from src/zstream/
 * Generated: 2026-06-23T04:32:21.349Z
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
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    const streams = [];
    try {
      let url;
      if (mediaType === "movie") {
        url = `https://vidsrc.xyz/embed/movie?tmdb=${tmdbId}`;
      } else {
        url = `https://vidsrc.xyz/embed/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}`;
      }
      const res = yield fetch(url);
      const html = yield res.text();
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
  });
}
module.exports = { getStreams };
