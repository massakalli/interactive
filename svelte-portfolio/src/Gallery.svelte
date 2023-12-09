<script>
	import Photograph from './Photograph.svelte';
	let ids = [];
	for ( let i = 0; i<100; i++) {
		let id = "A"+(i+1);
		ids.push(id)
	}
</script>

<main>
	<div class  = "flex-container">
		{#each ids as thisId}
			<div class = "photograph-container">
				<Photograph imageId={thisId}/>
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		background-color: black;
	}
	.flex-container {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.photograph-container {
    	flex: 1;
		transform: 0.3s ease;	
		filter: grayscale(80%) blur(2px);
	}
	
	.photograph-container:hover {
		filter: grayscale(0%) blur(0px);
		transform: scale(1.1); /* Increase the size of the image */
	}
	
</style>


