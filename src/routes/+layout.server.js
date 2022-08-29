export async function load() {
  console.log("layout");
  const res = await fetch("localhost:1337/api/categories?populate=image");
  const categories = await res.json();
  return {
    data: categories.data,
  };
}
