const domain = `https://random.spax.zone/webring-members`;

const fetchJSON = async (url) => {
  let data = [];
  await fetch(url)
    .then(response => response.json())
    .then(d => data = d);
  return data;
};

const randomArrayValue = (arr) => {
  return arr[Math.floor(arr.length * Math.random())];
};

const cobalt = await fetchJSON(`${domain}/cobalt.json`);
const cohost = await fetchJSON(`${domain}/cohost.json`);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    switch (url.pathname) {
      case "/webrings/cobalt":
        return Response.redirect(randomArrayValue(cobalt), 302);
      case "/webrings/cohost":
        return Response.redirect(randomArrayValue(cohost), 302);
      default:
        return Response.redirect("https://spax.zone/404", 302);
    }
  }
};