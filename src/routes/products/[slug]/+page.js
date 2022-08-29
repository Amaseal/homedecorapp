export const load = async ({ params }) => {
	const slug = params.slug;
	const productData = await fetch(
		`https://cms.sghomedecor.lv/api/products?filters[slug]=${slug}&populate=deep,2`
	).catch((error) => console.log(error));

	const product = await productData.json();
	return {
		product
	};
};
