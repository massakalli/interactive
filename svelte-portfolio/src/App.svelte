<script>
	import Photograph from './Photograph.svelte';
	let ids = [];
	for ( let i = 0; i<100; i++) {
		let id = "A"+(i+1);
		ids.push(id)
		console.log(id);
	}
</script>

<main>
	<p>Checkout my work:</p>
	<div class  = "grid-container">
		{#each ids as thisId}
			<div class = "photograph-container">
				<Photograph imageId={thisId}/>
			</div>
		{/each}
	</div>
</main>

<style>
	.grid-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
        gap: 10px;
        padding: 10px;
        max-width: 100vw;
        height: 100vh;
        overflow: auto;

	}

	.photograph-container {
		overflow: hidden;
	}
	
</style>


