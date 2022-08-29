<script>
	export let text;
</script>

<p>{text}</p>

<style>
	p {
		padding: 10px 60px 10px 60px;
		font-family: 'Playfair Display', serif;
		text-transform: uppercase;
		font-size: clamp(16px, 2.7vw, 28px);
		color: var(--primary);
	}
	p:nth-of-type(2n) {
		border-left: 2px solid var(--primary);
		border-right: 2px solid var(--primary);
	}
</style>
