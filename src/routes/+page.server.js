export async function load() {
  const home = await fetch(
    "https://cms.sghomedecor.lv/api/home?populate=background,quotes,about,about.image",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const homeData = await home.json();
  return {
    homeData,
  };
}
