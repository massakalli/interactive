<script>
	import Gallery from './Gallery.svelte';
	import Content from './animations/introText.svelte';
	import Photograph from './Photograph.svelte';
	import Property from './animations/Properties.svelte'
	import { onMount } from 'svelte';
    import { getItems } from './firestoreData.js';
    import { hoveredId } from './store.js';
  import Properties from './animations/Properties.svelte';


    let items = [];
    let hoveredItem;

    onMount(async () => {
        items = await getItems();
    });

    $: if ($hoveredId) {
        hoveredItem = items.find(item => item.id === $hoveredId);
        console.log(hoveredItem);
    }

	function formatDateToMonYY(date) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    let monthIndex = date.getMonth(); // getMonth() returns month from 0 (January) to 11 (December)
    let year = date.getFullYear().toString().substr(-2); // Get last two digits of year

    return `${monthNames[monthIndex]}-${year}`;
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
				<Photograph imageId={hoveredItem.id} imageHeight='100%'/>
				{/if}
			</div>
			<div class = "properties">
					<Property property = "medium" />
					<Property property = "date" />
					<Property property = "tags" />
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
		background-color: black;
		height: 50%;
		width: 100%;
		overflow-y: hidden;
		display: flex;
		justify-content: center;
	}
 
	.properties {
		background-color: wheat;
		display: grid;
		width: 100%;
		height: 10%;
	}

	.content-view {
		height: 40%;
		width: 100%;
		overflow-y: hidden;
	}
</style>
