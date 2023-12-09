<script>
    import p5 from 'p5';
    import {onMount} from 'svelte';

    export let textContent;
    export let size;
    

    let canvasParent;

    onMount(() => {
        const sketch = (p) => {
            p.setup = () => {
                p.createCanvas(100*size,50*size);
            }

            p.draw = () => {
                p.background(255);
                p.text(textContent,10,p.height/2);
            }
        }
        
        new p5(sketch, canvasParent);
    });
</script>

<div bind:this={canvasParent}></div>