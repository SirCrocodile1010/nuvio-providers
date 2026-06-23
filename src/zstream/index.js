async function getStreams(tmdbId, mediaType, season, episode) {
  const streams = [];
  try {
    var url = mediaType === "movie" ? "https://vidsrc.me/embed/movie?tmdb=" + tmdbId : "https://vidsrc.me/embed/tv?tmdb=" + tmdbId + "&season=" + season + "&episode=" + episode;
    var res = await fetch(url);
    var html = await res.text();
    var m = html.match(/file:"([^"]+)"/g) || [];
    m.forEach(function(s,i){streams.push({name:"ZStream",title:"Stream "+(i+1),url:s.replace('file:"','').replace('"'.''),quality:"HD"});});
  } catch(e) { console.log(e.message); }
  return streams;
}
module.exports={getStreams};