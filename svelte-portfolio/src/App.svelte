<script>
	import Gallery from './Gallery.svelte';
	import Content from './animations/introText.svelte';
	
	import {getItems} from './firestoreData.js';
  	import { onMount } from 'svelte';

	let items = [];
	let poem = null;
	
	onMount(async () => {
		items = await getItems();
		poem = items.find(item => item.id === 'A1');
		console.log(poem);
	});

	

</script>

<main>
	<div class = "exhibit-view">
		<div class = "gallery-view">
			<Gallery />
		</div>
		<div class = "content-view">
			{#if poem}
			<Content textContent = {poem.caption.text} size = 4 />
			{/if}
		</div>
	</div>
</main>

<style>
	.exhibit-view {
		display: flex;
		height:100vh
	}

	.gallery-view {
		width: 65vw;
		overflow-y: auto;
		height: 100vh
	}

	.content-view{
		width: 35vw;
		height: 100vh;
		overflow-y: hidden
	}
</style>


