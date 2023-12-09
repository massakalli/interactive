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
            console.log(imageUrl);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    });
</script>

{#if imageUrl}
    <img src="{imageUrl}" alt = "Loaded from Firebase" style = "width:100%; height: auto; object-fit:cover" />
{:else}
    <p> Loading image...</p>
{/if}