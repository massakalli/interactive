<script>
    import p5 from 'p5';
    import { onMount, onDestroy } from 'svelte';

    export let textContent;
    let canvasParent;

    let myp5;

    onMount(() => {
        const sketch = (p) => {
            p.setup = () => {
                p.createCanvas(canvasParent.clientWidth, canvasParent.clientHeight);
            };

            p.draw = () => {
                p.background(255);
                p.text(textContent, 10, p.height / 2);
            };
        };

        myp5 = new p5(sketch, canvasParent);

        // Resize canvas when window resizes
        const resizeCanvas = () => {
            myp5.resizeCanvas(canvasParent.clientWidth, canvasParent.clientHeight);
        };
        window.addEventListener('resize', resizeCanvas);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    });

    onDestroy(() => {
        myp5.remove(); // Remove the p5 instance when the component is destroyed
    });

    console.log(canvasParent);
</script>

<div bind:this={canvasParent} class="canvas-container">
    <!-- Canvas will be inserted here -->
</div>

<style>
    .canvas-container {
        width: 100%; 
        height: 100%;
    }
</style>