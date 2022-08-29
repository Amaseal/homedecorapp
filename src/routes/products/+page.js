export const load = async () => {
	const productData = await fetch(`https://cms.sghomedecor.lv/api/products?populate=deep,2`).catch(
		(error) => console.log(error)
	);
	const products = await productData.json();
	const colorData = await fetch(`https://cms.sghomedecor.lv/api/colors`).catch((error) =>
		console.log(error)
	);
	const colors = await colorData.json();

	return {
		products,
		colors
	};
};
