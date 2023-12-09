<script>
	import Gallery from './Gallery.svelte';
	import Content from './animations/introText.svelte';
	import { onMount } from 'svelte';
    import { getItems } from './firestoreData.js';
    import { hoveredId } from './store.js';

    let items = [];
    let poem;

    onMount(async () => {
        items = await getItems();
    });

    $: if ($hoveredId) {
        poem = items.find(item => item.id === $hoveredId);
        console.log(poem);
    }

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


