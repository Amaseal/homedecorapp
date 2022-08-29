export async function load() {
  console.log("index");
  const res = await fetch(
    "https://cms.sghomedecor.lv/api/home?populate=background,quotes,about,about.image"
  );
  const home = await res.json();
  return {
    data: home.data,
  };
}
