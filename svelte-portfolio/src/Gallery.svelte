<script>
	import Photograph from './Photograph.svelte';
	import {hoveredId} from './store.js';

	let ids = [];
	for ( let i = 0; i<100; i++) {
		let id = "A"+(i+1);
		ids.push(id)
	}

	function setHoveredId(id) {
        hoveredId.set(id);
    }

    function clearHoveredId() {
        hoveredId.set(null);
    }

</script>

<main>
	<div class  = "flex-container">
		{#each ids as thisId}
			<div class = "photograph-container"
				 on:mouseenter={() => setHoveredId(thisId)}
                 on:mouseleave={clearHoveredId}>
				<Photograph imageId={thisId} imageHeight="100px"/>
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


