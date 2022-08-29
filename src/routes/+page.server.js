export async function load() {
  const res = await fetch(
    "https://cms.sghomedecor.lv/api/home?populate=background,quotes,about,about.image"
  );
  const home = await res.json();
  return {
    home,
  };
}
