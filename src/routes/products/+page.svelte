<script>
	import Product from '$lib/components/Product.svelte';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { categories } from '$lib/scripts/categories';
	import IntersectionObserver from 'svelte-intersection-observer';
	import { goto } from '$app/navigation';

	export let data;

	let { products, colors } = data;
	$: ({ products, colors } = data);

	$: selectedProducts = products.data;

	let element;
	let currentColor;
	let currPage = 1;

	let backgroundImage = `https://cms.sghomedecor.lv${products.data[0].images[0].url}`;

	const sortColors = async (id) => {
		currentColor = id;
		const res = await fetch(
			`https://cms.sghomedecor.lv/api/products?filters[colors][id]=${id}&populate=deep,2&pagination[pageSize]=12`
		);
		const colouredProducts = await res.json();
		selectedProducts = colouredProducts.data;
		colorsOpen = false;
		goto(`/products#top`);
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

	async function fetchMore() {
		if (currentColor) {
			const res = await fetch(
				`https://cms.sghomedecor.lv/api/products?filters[colors][id]=${currentColor}&populate=deep,2&pagination[page]=${
					currPage + 1
				}&pagination[pageSize]=12`
			);
			const moreProducts = await res.json();
			products.data.push(...moreProducts.data);
			products.data = products.data;
			currPage++;
		} else {
			const res = await fetch(
				`https://cms.sghomedecor.lv/api/products?populate=deep,2&pagination[page]=${
					currPage + 1
				}&pagination[pageSize]=12`
			);
			const moreProducts = await res.json();
			products.data.push(...moreProducts.data);
			products.data = products.data;
			currPage++;
		}
	}

	let colorsOpen = false;
	let categoriesOpen = false;
	let newest = 'Newest';
</script>

<svelte:head>
	<title>Product catalogue</title>
</svelte:head>

<section class="hero" style="background: url({backgroundImage})">
	<div class="container">
		<h1>Products</h1>
	</div>
</section>
<a id="top">target</a>

<section class="product-section">
	<div class="filter-section">
		<div class="container filters">
			<div class="dropdown-toggle">
				<button class="toggle" on:click={() => (categoriesOpen = !categoriesOpen)}
					>Categories</button
				>

				{#if categoriesOpen}
					<div class="dropdown">
						{#each $categories as category}
							<a class="item" href={`/${category.slug}`}>{category.title}</a>
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
	<div class="container">
		{#key selectedProducts}
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
		{/key}
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
	a {
		text-align: center;
		display: block;
	}
	.product-section {
		position: relative;
		top: -76px;
	}
	.loader {
		margin-top: 20px;
	}
	:target {
		display: block;
		position: relative;
		top: -200px;
		visibility: hidden;
	}
</style>
