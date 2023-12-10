// Photograph.svelte

<script>
    import { files } from './firebase.js';
    import { getDownloadURL, ref } from 'firebase/storage';

    export let imageId;
    export let imageHeight;
    let imageUrl = '';

    $: imagePath = `artworksHub/${imageId}.png`;
    $: if (imageId) {
        fetchImageUrl(imagePath);
    }

    async function fetchImageUrl(path) {
        try {
            const imageRef = ref(files, path);
            imageUrl = await getDownloadURL(imageRef);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    }
</script>

{#if imageUrl}
    <img src="{imageUrl}" alt="Loaded from Firebase">
{:else}
    <p>Loading image...</p>
{/if}


<style>
    img {
        width: auto; 
        height: {imageHeight}; 
        object-fit: cover;
    }
</style>