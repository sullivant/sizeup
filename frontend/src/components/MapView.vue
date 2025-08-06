<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue'

    import hydrantData from '@/data/hydrants.json';


    const props = defineProps<{
        lat: number
        lng: number
        address?: string
    }>()

    const mapEl = ref<HTMLDivElement | null>(null)

    onMounted(() => {
        if (!window.google?.maps) return

        const center = { lat: props.lat, lng: props.lng }

        const hydrantCoords = hydrantData;

        const map = new google.maps.Map(mapEl.value as HTMLElement, {
            center,
            zoom: 17,
            mapTypeId: 'roadmap',
        })

        const marker = new google.maps.Marker({
            position: center,
            map,
            title: props.address || 'Selected Location',
        })

        // Now do our hydrant locations
        hydrantCoords.forEach(coord => {
            new google.maps.Marker({
                position: coord,
                map,
                title: 'Hydrant',
                icon: {
                    url: '/icons/hydrant_32x32.png',
                    scaledSize: new google.maps.Size(32, 32),
                }
            });
        });


        if (props.address) {
            const infoWindow = new google.maps.InfoWindow({
                content: `<div style="font-size:14px;">📍 ${props.address}</div>`,
            })

            // // Show the info window immediately
            // infoWindow.open(map, marker)

            // Show info window on click
            marker.addListener('click', () => {
                infoWindow.open(map, marker)
            })
        }
    })
</script>

<template>
  <div ref="mapEl" style="width: 100%; height: 100%" />
</template>
