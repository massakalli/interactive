<script>
    import { files } from './firebase.js';
    import { getDownloadURL, ref } from 'firebase/storage';
    import { onMount } from 'svelte';

    export let imagePath;
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
    <img src="{imageUrl}" alt = "Loaded from Firebase" />
{:else}
    <p> Loading image...</p>
{/if}