/**
 * zstream - Built from src/zstream/
 * Generated: 2026-06-23T08:19:18.677Z
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
      var u = b === "movie" ? "https://vidlink.pro/api/b/movie/" + a : "https://vidlink.pro/api/b/tv/" + a + "/" + c + "/" + d;
      var h = { "User-Agent": "Mozilla/5.0", "Referer": "https://vidlink.pro/", "Origin": "https://vidlink.pro" };
      var res = yield fetch(u, { headers: h });
      var data = yield res.json();
      if (data && data.stream) {
        r.push({ name: "ZStream", title: "VidLink HD", url: data.stream, quality: "HD" });
      }
      if (data && data.url) {
        r.push({ name: "ZStream", title: "VidLink HD", url: data.url, quality: "HD" });
      }
    } catch (e) {
      console.log(e.message);
    }
    return r;
  });
}
module.exports = { getStreams };
