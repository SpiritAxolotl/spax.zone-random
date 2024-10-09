const domain = `https://random.spax.zone/webring-members`;

const randomArrayValue = (arr) => {
  return arr[Math.floor(arr.length * Math.random())];
};

export default {
  async fetch(request, env, ctx) {
    const fetchJSON = async (link) => {
      let data = [];
      await fetch(link, {
        method: "GET",
        headers: new Headers({
          "Accept": "application/json",
          "Content-Type": "application/json",
          "User-Agent": "SPAX-WEBRING-FETCH"
        })
      })
        .then(response => response.json())
        .then(d => data = d);
      return data;
    };
    const url = new URL(request.url);
    switch (url.pathname) {
      case "/webrings/cobalt":
        const cobalt = await fetchJSON(`${domain}/cobalt.json`);
        return Response.redirect(randomArrayValue(cobalt), 302);
      case "/webrings/cohost":
        const cohost = await fetchJSON(`${domain}/cohost.json`);
        return Response.redirect(randomArrayValue(cohost), 302);
      default:
        return Response.redirect("https://spax.zone/404", 302);
    }
  }
};