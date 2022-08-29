<script>
	let open = false;
</script>

<section>
	<div class="container">
		<h2>Get in touch with us!</h2>
		<button
			class="button"
			on:click={() => {
				open = !open;
			}}>contact us</button
		>

		{#if open}
			<div class="contact-form">
				<button
					class="close"
					on:click={() => {
						open = !open;
					}}><img src="./close.svg" alt="" /></button
				>
				<form action="">
					<h2>Get in touch with us!</h2>
					<div class="flex">
						<div class="input">
							<label for="name">Name</label>
							<input type="text" name="name" id="name" />
						</div>
						<div class="input">
							<label for="email">E-mail</label>
							<input type="email" name="email" id="email" />
						</div>
					</div>
					<label for="message">Message</label>
					<textarea name="message" id="message" cols="30" rows="5" />

					<button type="submit" class="button two">Send</button>
				</form>
			</div>
		{/if}
	</div>
</section>

<style>
	section {
		padding: 170px 0;
		background-color: var(--secondary);
		position: relative;
	}
	form {
		display: flex;
		flex-direction: column;
	}
	.contact-form {
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: var(--secondary);
		display: grid;
		place-items: center;
	}
	.flex {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
		margin-bottom: 20px;
	}
	.input {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	input,
	textarea {
		border-radius: 20px;
		padding: 20px;
		border: none;
		resize: none;
	}
	h2 {
		font-size: 56px;
		text-align: center;
		padding-bottom: 90px;
	}
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.button {
		border-radius: 10px;
		border: none;
		background: transparent;
		margin-top: 80px;
		transition: all 0.2s ease;
	}
	.button:hover {
		letter-spacing: 4px;
	}
	.close {
		position: absolute;
		top: 100px;
		right: 100px;
		background: transparent;
		border: none;
		cursor: pointer;
	}
	.two {
		margin-top: 20px;
	}
</style>
