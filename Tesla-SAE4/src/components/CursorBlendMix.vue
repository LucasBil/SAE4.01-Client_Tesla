<script setup>
    defineProps({
        size: {
            type: Number,
            required: true,
            default: 100
        }
    });

    let body = document.querySelector("body");
    body.addEventListener("mouseenter", (e) => {
        let cursor = document.getElementById("cursor");
    });
    body.addEventListener("mousemove", (e) => {
        cursor.style.left = e.pageX - (cursor.offsetWidth/2) + "px";
        cursor.style.top = e.pageY - (cursor.offsetHeight/2) + "px";
    });
</script>

<template>
    <div id="cursor" :style="'width:'+size+'px; height:'+size+'px; left:'+-size+'px'" class="absolute z-10 bg-primary ease-in-out pointer-events-none mix-blend-exclusion rounded-full"></div>
</template>