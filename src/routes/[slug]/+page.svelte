<script>
	import Product from '$lib/components/Product.svelte';
	import { goto } from '$app/navigation';
	import { flip } from 'svelte/animate';
	import { crossfade, scale } from 'svelte/transition';
	import IntersectionObserver from 'svelte-intersection-observer';

	export let data;

	let { category, products, colors } = data;
	$: ({ category, products, colors } = data);

	$: selectedProducts = products.data;

	$: backgroundImage = `https://cms.sghomedecor.lv${category.data[0].image.url}`;

	let currentId = false;
	let currentColor = false;

	let element;
	let currPage = 1;
	let colorsOpen = false;
	let categoriesOpen = false;

	let newest = 'Newest';

	const sortCategories = async (id) => {
		currentColor = false;
		currPage = 1;
		if (!id) {
			currentId = false;
			const res = await fetch(
				`https://cms.sghomedecor.lv/api/products?filters[categories][slug]=${category.data[0].slug}&populate=deep,2&pagination[pageSize]=12`
			);
			const filteredProducts = await res.json();
			products.data = filteredProducts.data;
			categoriesOpen = false;
			goto(`/${category.data[0].slug}#top`);
		} else {
			const res = await fetch(
				`https://cms.sghomedecor.lv/api/products?filters[categories][slug]=${category.data[0].slug}&filters[subcategory][id]=${id}&populate=deep,2&pagination[pageSize]=12`
			);
			const filteredProducts = await res.json();
			products.data = filteredProducts.data;
			categoriesOpen = false;
			goto(`/${category.data[0].slug}#top`);
			currentId = id;
		}
	};

	const sortNewest = () => {
		if (newest === 'Newest') {
			selectedProducts.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
			selectedProducts = selectedProducts;
			newest = 'Oldest';
		} else {
			selectedProducts.sort((a, b) => Date.parse(a.updatedAt) - Date.parse(b.updatedAt));
			selectedProducts = selectedProducts;
			newest = 'Newest';
		}
	};

	const sortColors = async (id) => {
		currentId = false;
		currentColor = id;
		currPage = 1;
		const res = await fetch(
			`https://cms.sghomedecor.lv/api/products?filters[categories][slug]=${category.data[0].slug}&filters[colors][id]=${id}&populate=deep,2&pagination[pageSize]=12`
		);
		const colouredProducts = await res.json();
		products.data = colouredProducts.data;

		colorsOpen = false;
		goto(`/${category.data[0].slug}#top`);
	};

	async function fetchMore() {
		if (currentColor) {
			const res = await fetch(
				`https://cms.sghomedecor.lv/api/products?filters[categories][slug]=${
					category.data[0].slug
				}&filters[colors][id]=${currentColor}&populate=deep,2&pagination[page]=${
					currPage + 1
				}&pagination[pageSize]=12`
			);
			const moreProducts = await res.json();
			products.data.push(...moreProducts.data);
			products.data = products.data;
			currPage++;
		} else if (currentId) {
			const res = await fetch(
				`https://cms.sghomedecor.lv/api/products?filters[categories][slug]=${
					category.data[0].slug
				}&filters[subcategory][id]=${currentId}&populate=deep,2&pagination[page]=${
					currPage + 1
				}&pagination[pageSize]=12`
			);
			const moreProducts = await res.json();
			products.data.push(...moreProducts.data);
			products.data = products.data;
			currPage++;
		} else {
			const res = await fetch(
				`https://cms.sghomedecor.lv/api/products?filters[categories][slug]=${
					category.data[0].slug
				}&populate=deep,2&pagination[page]=${currPage + 1}&pagination[pageSize]=12`
			);
			const moreProducts = await res.json();
			products.data.push(...moreProducts.data);
			products.data = products.data;
			currPage++;
		}
	}
</script>

<svelte:head>
	<title>{category.data[0].title}</title>
</svelte:head>

<section class="hero" style="background: url({backgroundImage})">
	<div class="container">
		<h1>{category.data[0].title}</h1>
	</div>
</section>
<a id="top">target</a>

<section class="product-section">
	<div class="filter-section">
		<div class="container filters">
			<div class="dropdown-toggle">
				<button class="toggle" on:click={() => (categoriesOpen = !categoriesOpen)}
					>Product type</button
				>

				{#if categoriesOpen}
					<div class="dropdown">
						<button class="item" on:click={() => sortCategories()}>All</button>
						{#each category.data[0].subcategories as subcategory}
							<button class="item" on:click={() => sortCategories(subcategory.id)}
								>{subcategory.name}</button
							>
						{/each}
					</div>
				{/if}
			</div>
			<div class="dropdown-toggle">
				<button class="toggle" on:click={() => sortNewest()}>{newest}</button>
			</div>
			<div class="dropdown-toggle">
				<button class="toggle" on:click={() => (colorsOpen = !colorsOpen)}>Color</button>
				{#if colorsOpen}
					<div class="dropdown colors">
						{#each colors.data as color}
							<button
								on:click={() => sortColors(color.id)}
								class="color"
								style="background-color: #{color.hex};"
							/>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div id="products" class="container">
		{#if selectedProducts.length > 0}
			<div class="products">
				{#each selectedProducts as product, i (product.id)}
					<div
						animate:flip={{ duration: 200 }}
						in:scale={{ delay: 50 }}
						out:scale={{ duration: 1 }}
					>
						<Product {product} />
					</div>
				{/each}
			</div>
		{:else}
			<h2>no products</h2>
		{/if}
	</div>
</section>
<div class="loader">
	<IntersectionObserver
		{element}
		on:intersect={(e) => {
			fetchMore();
		}}
	>
		<div bind:this={element} />
	</IntersectionObserver>
</div>

<style>
	h1 {
		max-width: 70vw;
	}
	.hero {
		height: 100vh;
		text-align: center;
		display: grid;
		place-items: center;
	}
	.filters {
		position: sticky;
		top: -80px;
		height: auto;
		z-index: 99999;
		display: flex;
		padding: 10px 0;
	}
	.dropdown-toggle {
		position: relative;
		width: 30%;
		font-family: 'Playfair Display', serif;
		text-transform: uppercase;
		font-size: 20px;
	}
	.dropdown {
		padding: 20px;
		border-radius: 20px;
		width: 100%;
		position: absolute;
		bottom: 0;
		transform: translate(0, 100%);
		background-color: var(--secondary);
		z-index: 100;
	}
	.toggle {
		padding: 20px 0;
		width: 100%;
		font-family: inherit;
		font-size: inherit;
		border: none;
		background-color: transparent;
		letter-spacing: 2px;
		transition: letter-spacing 0.2s ease;
		text-transform: uppercase;
	}
	.toggle:hover {
		letter-spacing: 4px;
		cursor: pointer;
	}
	.item {
		width: 100%;
		padding: 10px 0;
		font-size: inherit;
		border: none;
		background-color: transparent;
		letter-spacing: 2px;
		transition: letter-spacing 0.2s ease;
	}
	.item:hover {
		letter-spacing: 4px;
	}
	.products {
		padding-top: 50px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20px;
	}
	.color {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		margin-right: 10px;
	}
	.colors {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		gap: 5px;
		padding: 30px;
	}
	.filter-section {
		position: sticky;
		top: 76px;
		z-index: 9999;
		background-color: var(--secondary);
	}
	h2 {
		text-align: center;
	}
	.product-section {
		position: relative;
		top: -100px;
	}
	.loader {
		margin-top: 20px;
	}
	#top {
		margin-top: auto;
		display: block;
		position: relative;
		top: -200px;
		visibility: hidden;
	}
</style>
