const domain = `https://random.spax.zone/webrings`;

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

const cobalt = fetchJSON(`${domain}/cobalt.json`);
const cohost = fetchJSON(`${domain}/cohost.json`);

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