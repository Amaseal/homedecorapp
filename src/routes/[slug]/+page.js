export const load = async ({ params }) => {
	const slug = params.slug;
	const productData = await fetch(
		`https://cms.sghomedecor.lv/api/products?filters[categories][slug]=${slug}&populate=deep,2&pagination[pageSize]=12&pagination[page]=1`
	).catch((error) => console.log(error));
	const categoryData = await fetch(
		`https://cms.sghomedecor.lv/api/categories?filters[slug]=${slug}&populate=deep,2`
	).catch((error) => console.log(error));
	const colorData = await fetch(`https://cms.sghomedecor.lv/api/colors`).catch((error) =>
		console.log(error)
	);
	const colors = await colorData.json();
	const category = await categoryData.json();
	const products = await productData.json();

	return {
		category,
		colors,
		products
	};
};
