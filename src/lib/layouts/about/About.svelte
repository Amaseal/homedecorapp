<script>
	import { home } from '$lib/scripts/home';
	import { blur } from 'svelte/transition';

	import Text from '$lib/components/Text.svelte';

	let observed = 0;

	$: source = 'https://cms.sghomedecor.lv' + $home.about[observed].image.url;
</script>

<section>
	<div class="container flex">
		{#key observed}
			<img in:blur={{ delay: 1, duration: 500 }} src={source} alt="" />
		{/key}

		<div class="text">
			{#each $home.about as about, i}
				<Text {about} bind:observed {i} />
			{/each}
		</div>
	</div>
</section>

<style>
	.text {
		width: 50%;
		padding-left: 150px;
	}
	section {
		background: var(--secondary);
		padding: 100px 0;
	}
	img {
		height: 500px;
		width: 50%;
		object-fit: cover;
		position: sticky;
		top: 20%;
		/* transform: translateY(-50%); */
		border-radius: 20px;
	}
	.flex {
		position: relative;
		display: flex;
	}
</style>
