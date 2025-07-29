<script setup lang="ts">
    import { onMounted, ref, watch } from 'vue'

    const props = defineProps<{
        lat: number
        lng: number
        address?: string
    }>()

    const mapEl = ref<HTMLDivElement | null>(null)

    onMounted(() => {
    if (!window.google?.maps) return

    const center = { lat: props.lat, lng: props.lng }

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

    if (props.address) {
        const infoWindow = new google.maps.InfoWindow({
        content: `<div style="font-size:14px;">📍 ${props.address}</div>`,
        })

        // Show the info window immediately
        infoWindow.open(map, marker)

        // Optional: Show info window on click
        marker.addListener('click', () => {
        infoWindow.open(map, marker)
        })
    }
    })
</script>

<template>
  <div ref="mapEl" style="width: 100%; height: 100%" />
</template>
