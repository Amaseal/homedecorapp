<script>
	import SvelteMarkdown from 'svelte-markdown';
	export let data;

	let { product } = data;
	$: ({ product } = data);

	$: source = product.data[0].description;
</script>

<svelte:head>
	<title>{product.data[0].title}</title>
</svelte:head>

<section>
	<div class="container">
		<div class="images">
			{#each product.data[0].images as image}
				<img src={`https://cms.sghomedecor.lv${image.formats.large.url}`} alt={image.alt} />
			{/each}
		</div>
		<div class="description">
			<h1>{product.data[0].title}</h1>
			<a sveltekit:prefetch href={`/${product.data[0].categories[0].slug}`}
				>{product.data[0].categories[0].title}</a
			>
			<SvelteMarkdown {source} />
		</div>
	</div>
</section>

<style>
	h1 {
		font-size: 40px;
	}
	a {
		color: grey;
		display: block;
		margin-bottom: 60px;
		transition: all 0.2s ease;
	}
	a:hover {
		letter-spacing: 4px;
	}
	section {
		position: relative;
	}
	.container {
		display: flex;
		position: relative;
	}
	.description {
		padding-top: 150px;
		position: sticky;
		top: 0;
		width: 50%;
		margin-left: 80px;
		padding-right: 20px;
		align-self: flex-start;
		height: auto;
	}

	.images {
		padding-top: 150px;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: minmax(min-content, max-content);
		gap: 20px;
		border-radius: 20px;
		width: 50%;
	}
	img {
		width: 100%;
		object-fit: cover;
		height: 100%;
		border-radius: 20px;
		background-color: var(--secondary);
	}
	img:nth-of-type(4n) {
		grid-column: span 2;
		height: 80vh;
	}
	img:nth-of-type(1) {
		grid-column: span 2;
		height: 80vh;
	}
</style>
