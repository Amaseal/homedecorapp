<script>
	export let image;
	export let text;
	export let link;
</script>

<a href={link} sveltekit:prefetch>
	<div class="image-container">
		<img src={image} alt={text} />
	</div>

	<p>{text}</p>
</a>

<style>
	img {
		width: 100%;
		object-fit: cover;
		height: 100%;
		border-radius: 20px;
		transition: transform 0.5s ease;
	}
	a {
		display: flex;
		flex-direction: column;
		align-items: center;
		letter-spacing: 1px;
		font-size: 18px;
	}
	a:hover > p {
		letter-spacing: 3px;
	}
	a:hover > .image-container > img {
		transform: scale(1.2);
	}
	p {
		text-align: center;
		letter-spacing: 5px;
		transition: all 0.5s ease;
		margin-top: 25px;
	}
	.image-container {
		overflow: hidden;
		border-radius: 20px;
		width: 100%;
		height: 285px;
	}
</style>
