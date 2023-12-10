<script>
	import Gallery from './Gallery.svelte';
	import Content from './animations/introText.svelte';
	import Photograph from './Photograph.svelte';
	import { onMount } from 'svelte';
    import { getItems } from './firestoreData.js';
    import { hoveredId } from './store.js';


    let items = [];
    let hoveredItem;

    onMount(async () => {
        items = await getItems();
    });

    $: if ($hoveredId) {
        hoveredItem = items.find(item => item.id === $hoveredId);
        console.log(hoveredItem);
    }

</script>

<main>
	<div class = "exhibit-view">
		<div class = "gallery-view">
			<Gallery />
		</div>
		<div class = "hovered-media">
			<div class = "image-view">
				{#if hoveredItem}
				<Photograph imageId={hoveredItem.id} imageHeight="100%"/>
				{/if}
			</div>
			<div class = "content-view">
				{#if hoveredItem}
				<Content textContent = {hoveredItem.caption.text}/>
				{/if}
			</div>
		</div>
		
	</div>
</main>

<style>
	.exhibit-view {
		width: 100vw;
		display: flex;
		height: 100vh;
	}

	.gallery-view {
		width: 45vw;
		overflow-y: auto;
		height: 100vh;
	}

	.hovered-media {
		display: flex;
		flex-direction: column;
		width: 55vw;
		height: 100vh;
	}

	.image-view {
		height: 40%;
		width: 100%;
		overflow-y: hidden;
		align-content: center;
	}

	.content-view {
		height: 60%;
		width: 100%;
		overflow-y: hidden;
	}
</style>
