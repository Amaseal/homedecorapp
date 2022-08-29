<script>
	import DesktopNav from './desktopnav/DesktopNav.svelte';
	import MobileNav from './mobilenav/MobileNav.svelte';

	let width;
	let scrolled;
</script>

<svelte:window bind:innerWidth={width} bind:scrollY={scrolled} />

<header class:scroll={scrolled > 100}>
	<div class="container">
		{#if width >= 900}
			<DesktopNav />
		{:else}
			<MobileNav />
		{/if}
	</div>
</header>

<style>
	header {
		position: fixed;
		width: 100%;
		top: 0;
		padding: 30px 0;
		transition: all 0.2s ease;
		z-index: 1000000000;
	}
	.scroll {
		padding: 10px 0;
		background-color: var(--secondary);
	}
	.container {
		display: flex;
		align-items: center;
		width: 100%;
	}
</style>
