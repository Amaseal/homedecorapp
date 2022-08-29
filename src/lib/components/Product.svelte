<script>
	export let product;
	let hover = false;
</script>

<div
	class="card"
	on:mouseenter={() => {
		hover = true;
	}}
	on:mouseleave={() => {
		hover = false;
	}}
>
	<div class="img-container ">
		{#if hover && product.images.length > 1}
			<img
				class="hovered"
				src={`https://cms.sghomedecor.lv${product.images[1].formats.small.url}`}
				alt=""
			/>
		{/if}
		<img src={`https://cms.sghomedecor.lv${product.images[0].formats.small.url}`} alt="" />
	</div>

	<a sveltekit:prefetch href="/products/{product.slug}"
		><img class="eye" src="./eye.svg" alt="" /></a
	>
	<div class="text">
		<h3>{product.title}</h3>
	</div>
</div>

<style>
	.hovered {
		z-index: 10;
	}
	.img-container {
		width: 100%;
		object-fit: cover;
		height: 375px;
		border-radius: 20px;
		position: relative;
	}
	h3 {
		padding-bottom: 20px;
		padding-top: 20px;
		font-size: 26px;
		transition: transform 0.2s ease-in-out;
		letter-spacing: 2px;
	}
	a {
		border: 0px solid;
		border-radius: 50%;
		height: 0px;
		width: 0px;
		position: absolute;
		top: 375px;
		background: white;
		transition: all 0.2s ease-in-out;
		display: grid;
		place-items: center;
		transform: translate(0, -50%);
		outline: 5px solid var(--primary);
		outline-offset: -12px;
		z-index: 20;
	}

	a:hover > .eye {
		height: 65%;
		width: 65%;
	}

	img {
		width: 100%;
		object-fit: cover;
		height: 375px;
		border-radius: 20px;
		position: absolute;
		top: 0;
		background-color: white;
	}
	.eye {
		height: 55%;
		width: 55%;
		object-fit: contain;
		transition: all 0.2s ease-in-out;
		position: static;
	}
	.text {
		min-height: 130px;
		display: grid;
		place-items: center;
	}
	.card {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		min-height: 475px;
		justify-content: space-between;
	}
	.card:hover > a {
		width: 100px;
		height: 100px;
	}
	.card:hover > .text > h3 {
		transform: scale(0.6);
	}
	a:hover {
		width: 100px;
		height: 100px;
	}
</style>
