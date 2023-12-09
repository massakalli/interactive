<script>
    import { files } from './firebase.js';
    import { getDownloadURL, ref } from 'firebase/storage';
    import { onMount } from 'svelte';

    export let imageId;
    let imagePath = "artworksHub/"+imageId+".png";
    let imageUrl = '';

    onMount( async () => {
        try {
            const imageRef = ref(files, imagePath);
            imageUrl = await getDownloadURL(imageRef);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    });
</script>

{#if imageUrl}
    <img src="{imageUrl}" alt = "Loaded from Firebase"/>
{:else}
    <p> Loading image...</p>
{/if}

<style>
    img {
        width: auto; 
        height: 100px; 
        object-fit: cover;
    }
</style>