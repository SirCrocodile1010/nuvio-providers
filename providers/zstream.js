/**
 * zstream - Built from src/zstream/
 * Generated: 2026-06-23T08:10:16.889Z
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
function getStreams(a, b, c, d) {
  return __async(this, null, function* () {
    var r = [];
    try {
      var u = b === "movie" ? "https://vidsrc.me/embed/movie?tmdb=" + a : "https://vidsrc.me/embed/tv?tmdb=" + a + "&season=" + c + "&episode=" + d;
      r.push({ name: "ZStream", title: "VidSrc HD", url: u, quality: "HD" });
    } catch (e) {
    }
    return r;
  });
}
module.exports = { getStreams };
