export async function load() {
  console.log("layout");
  const res = await fetch(
    "https://cms.sghomedecor.lv/api/categories?populate=image"
  );
  const categories = await res.json();
  return {
    data: categories.data,
  };
}
