<script>
	import { categories } from '$lib/scripts/categories';
</script>

<section>
	<div class="container">
		<h2>Products</h2>
		<div class="grid">
			{#each $categories as category}
				<a href="/{category.slug}" sveltekit:prefetch>
					<div class="image-container">
						<img src="https://cms.sghomedecor.lv{category.image.url}" alt="" />
					</div>

					<p>{category.title}</p>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		gap: 16px;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
	}
	img {
		width: 100%;
		height: 500px;
		border-radius: 20px;
		object-fit: cover;
		transition: transform 0.5s ease;
	}
	a {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	section {
		padding: 100px 0;
	}
	p {
		font-size: 44px;
		transition: all 0.2s ease;
	}
	.image-container {
		overflow: hidden;
		border-radius: 20px;
		width: 100%;
		height: 420px;
	}
	a:hover > p {
		letter-spacing: 4px;
	}
	a:hover > .image-container > img {
		transform: scale(1.1);
	}
	h2 {
		font-size: 56px;
		margin-bottom: 70px;
		text-align: center;
	}
</style>
