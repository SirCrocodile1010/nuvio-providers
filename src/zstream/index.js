const BASE_VIDSRC = "https://vidsrc.to/embed";
const BASE_AUTOEMBED = "https://autoembed.cc/api/tm";

async function fetchVidsrc(tmdbId, mediaType, season, episode) {
  const streams = [];
  try {
    let url;
    if (mediaType === "movie") {
      url = `${BASE_VIDSRC}/movie/${tmdbId}`;
    } else {
      url = `${BASE_VIDSRC}/tv/${tmdbId}/${season}/${episode}`;
    }
    const res = await fetch(url);
    const html = await res.text();
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
}

async function fetchAutoembed(tmdbId, mediaType, season, episode) {
  const streams = [];
  try {
    let url;
    if (mediaType === "movie") {
      url = `${BASE_AUTOEMBED}/movie/${tmdbId}`;
    } else {
      url = `${BASE_AUTOEMBED}/tv/${tmdbId}/${season}/${episode}`;
    }
    const res = await fetch(url);
    const data = await res.json();
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
}

async function getStreams(tmdbId, mediaType, season, episode) {
  const streams = [];
  const [vidsrcStreams, autoembedStreams] = await Promise.all([
    fetchVidsrc(tmdbId, mediaType, season, episode),
    fetchAutoembed(tmdbId, mediaType, season, episode)
  ]);
  streams.push(...vidsrcStreams);
  streams.push(...autoembedStreams);
  return streams;
}

module.exports = { getStreams };
