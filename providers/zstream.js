/**
 * zstream - Built from src/zstream/
 * Generated: 2026-06-23T03:46:46.253Z
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
var BASE_VIDSRC = "https://vidsrc.to/embed";
var BASE_AUTOEMBED = "https://autoembed.cc/api/tm";
function fetchVidsrc(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    const streams = [];
    try {
      let url;
      if (mediaType === "movie") {
        url = `${BASE_VIDSRC}/movie/${tmdbId}`;
      } else {
        url = `${BASE_VIDSRC}/tv/${tmdbId}/${season}/${episode}`;
      }
      const res = yield fetch(url);
      const html = yield res.text();
      const srcMatches = html.match(/src:\s*["']([^"']+m3u8[^"']*)/g);
      if (srcMatches) {
        srcMatches.forEach((match, i) => {
          const u = match.replace(/src:\s*["']/, "");
          streams.push({ name: "ZStream", title: `VidSrc ${i + 1}`, url: u, quality: "HD" });
        });
      }
    } catch (e) {
      console.log("VidSrc error:", e.message);
    }
    return streams;
  });
}
function fetchAutoembed(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    const streams = [];
    try {
      let url;
      if (mediaType === "movie") {
        url = `${BASE_AUTOEMBED}/movie/${tmdbId}`;
      } else {
        url = `${BASE_AUTOEMBED}/tv/${tmdbId}/${season}/${episode}`;
      }
      const res = yield fetch(url);
      const data = yield res.json();
      if (data && data.url) {
        streams.push({ name: "ZStream", title: "AutoEmbed HD", url: data.url, quality: "HD" });
      }
      if (data && data.streams) {
        data.streams.forEach((s, i) => {
          streams.push({ name: "ZStream", title: `AutoEmbed ${i + 1}`, url: s.url || s, quality: s.quality || "HD" });
        });
      }
    } catch (e) {
      console.log("AutoEmbed error:", e.message);
    }
    return streams;
  });
}
function getStreams(tmdbId, mediaType, season, episode) {
  return __async(this, null, function* () {
    const streams = [];
    const [vidsrcStreams, autoembedStreams] = yield Promise.all([
      fetchVidsrc(tmdbId, mediaType, season, episode),
      fetchAutoembed(tmdbId, mediaType, season, episode)
    ]);
    streams.push(...vidsrcStreams);
    streams.push(...autoembedStreams);
    return streams;
  });
}
module.exports = { getStreams };
