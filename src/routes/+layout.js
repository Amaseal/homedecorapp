export async function load() {
	const categories = await fetch('https://cms.sghomedecor.lv/api/categories?populate=image', {
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const categoryData = await categories.json();
	return {
		categoryData
	};
}
