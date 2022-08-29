<script>
	import IntersectionObserver from 'svelte-intersection-observer';
	export let about;
	export let element;
	export let i;
	export let observed;
	let intersecting;

	console.log();

	let rootMargin = '-32%';
</script>

<IntersectionObserver
	{element}
	bind:intersecting
	{rootMargin}
	on:intersect={(e) => {
		observed = i;
	}}
>
	<div bind:this={element}>
		<h2>{about.title}</h2>
		<p>{about.description}</p>
	</div>
</IntersectionObserver>

<style>
	h2 {
		font-size: 56px;
		margin-bottom: 70px;
		margin-top: 20px;
	}
	p {
		font-size: 24px;
		margin-bottom: 100px;
	}
	div:last-of-type > p {
		margin-bottom: 0;
	}
</style>
