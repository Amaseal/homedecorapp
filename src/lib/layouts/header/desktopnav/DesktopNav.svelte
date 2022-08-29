<script>
	import NavLink from '$lib/components/NavLink.svelte';
	import { Hamburger } from 'svelte-hamburgers';
	import { categories } from '$lib/scripts/categories';
	let open;
</script>

<div class="hamburger">
	<Hamburger bind:open type="spring" />
</div>

<a href="/">
	<img class="logo" src="./sg_logo-02.svg" alt="" />
</a>

<div class="button">
	<a href="/products" class="inner-button">Products</a>
</div>

<nav class:open>
	<div class="container">
		{#each $categories as category}
			<NavLink
				text={category.title}
				image={`https://cms.sghomedecor.lv${category.image.formats.small.url}`}
				link={`/${category.slug}`}
			/>
		{/each}
	</div>
</nav>

<style>
	.logo {
		margin-left: 20px;
		height: 40px;
		position: relative;
		z-index: 10000;
	}
	nav {
		position: fixed;
		top: -100%;
		left: 0;
		width: 100%;
		padding-top: 200px;
		padding-bottom: 64px;
		background-color: var(--secondary);
		transition: all 0.3s ease-in-out;
	}
	.open {
		top: 0;
	}
	.hamburger {
		display: grid;
		place-items: center;
		position: relative;
		z-index: 10000;
		cursor: pointer;
	}
	.button {
		display: grid;
		place-items: center;
		border-radius: 10px;
		margin-left: auto;
		position: relative;
		z-index: 10000;
		width: 150px;
	}
	.container {
		display: grid;
		gap: 20px;
		grid-template-columns: repeat(5, 1fr);
	}
</style>
