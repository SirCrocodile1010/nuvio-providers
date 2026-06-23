/**
 * zstream - Built from src/zstream/
 * Generated: 2026-06-23T04:26:01.022Z
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
        url = `https://vidlink.pro/movie/${tmdbId}`;
      } else {
        url = `https://vidlink.pro/tv/${tmdbId}/${season}/${episode}`;
      }
      streams.push({
        name: "ZStream",
        title: "VidLink HD",
        url,
        quality: "HD",
        type: "embed"
      });
    } catch (e) {
      console.log("Error:", e.message);
    }
    return streams;
  });
}
module.exports = { getStreams };
