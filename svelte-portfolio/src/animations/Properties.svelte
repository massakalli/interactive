<script>
    import { getItems } from '../firestoreData.js';
    import { onMount } from 'svelte';
    import { hoveredId } from '../store.js';

    let items = [];
    let hoveredItem;
    export let property;

    onMount(async () => {
        items = await getItems();
    });

    $: if ($hoveredId) {
        hoveredItem = items.find(item => item.id === $hoveredId);
    }

    function formatDateToMonYY(timestamp) {
        // Convert string timestamp to number, then to Date object
        const date = new Date(Number(timestamp));
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        let monthIndex = date.getMonth();
        let year = date.getFullYear().toString().substr(-2);

        return `${monthNames[monthIndex]}-${year}`;
    }

    $: formattedProperty = hoveredItem && property && !isNaN(Number(hoveredItem[property])) 
        ? formatDateToMonYY(hoveredItem[property]) 
        : (hoveredItem ? hoveredItem[property] : '');
</script>

<div>
    {formattedProperty}
</div>
