export async function load() {
  const res = await fetch(
    "https://cms.sghomedecor.lv/api/categories?populate=image"
  );
  const categories = await res.json();
  return {
    categories,
  };
}
