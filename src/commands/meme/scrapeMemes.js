const { get } = require('axios');

async function scrapeMemes(igPages) {

  const memeURLs = [];

  for (let i in igPages) {

    const url = `https://www.instagram.com/${igPages[i]}/channel/?__a=1`;
    const json = await get(url);
    const posts = json.data.graphql.user.edge_owner_to_timeline_media.edges;

    posts.forEach(post => {
      if (post.node.is_video)
        memeURLs.push(post.node.video_url);
      else
        memeURLs.push(post.node.display_url);
    });

  }

  return memeURLs;
}


module.exports = scrapeMemes;
