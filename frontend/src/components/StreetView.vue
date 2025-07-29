<script setup lang="ts">
    import type { AppSettings } from '@/types/AppSettings'
    import { onMounted, ref } from 'vue'
    import { defineEmits } from 'vue'

    const props = defineProps<{
        settings: AppSettings
    }>();


    const streetViewContainer = ref<HTMLDivElement | null>(null)
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    // Hardcoded ZIP code to pick a random spot in
    const ZIP = '06098' 

    type LatLng = { lat: number; lng: number }

    const emit = defineEmits<{
        (e: 'locationChosen', payload: { lat: number; lng: number; address: string }): void
    }>()

    async function loadGoogleMapsApi(): Promise<void> {
        return new Promise((resolve, reject) => {
            if ((window as any).google?.maps) {
                resolve()
                return
            }
            const script = document.createElement('script')
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
            script.async = true
            script.defer = true
            script.onload = () => resolve()
            script.onerror = () => reject(new Error('Failed to load Google Maps API'))
            document.head.appendChild(script)
        })
    }

    function reverseGeocode(lat: number, lng: number): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!window.google || !window.google.maps) {
                reject(new Error('Google Maps API is not loaded'))
                return
            }
            const geocoder = new google.maps.Geocoder()
            const latlng = new google.maps.LatLng(lat, lng)
            geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
                resolve(results[0].formatted_address)
            } else {
                console.warn('Geocoder failed due to:', status)
                resolve('Unknown address')
            }
            })
        })
    }

    async function isStreetViewAvailable(lat: number, lng: number): Promise<boolean> {
        const url = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&key=${apiKey}`
        const res = await fetch(url)
        const data = await res.json()
        return data.status === 'OK'
    }


    // Pick random lat/lng inside bounding box
    function getRandomLatLng(bounds: { northeast: LatLng; southwest: LatLng }): LatLng {
        const lat = bounds.southwest.lat + Math.random() * (bounds.northeast.lat - bounds.southwest.lat)
        const lng = bounds.southwest.lng + Math.random() * (bounds.northeast.lng - bounds.southwest.lng)
        return { lat, lng }
    }

    async function getValidStreetViewLocationFromBounds(
        bounds: { northeast: LatLng; southwest: LatLng },
        maxTries = 10
    ): Promise<LatLng> {

        for (let i = 0; i < maxTries; i++) {
            const point = getRandomLatLng(bounds);
            if (await isStreetViewAvailable(point.lat, point.lng)) {
            return point;
            }
        }

        // fallback coordinate if no valid point found
        return {
            lat: 40.758, // Times Square fallback
            lng: -73.9855,
        };
    }


    onMounted(async () => {
        try {
            await loadGoogleMapsApi()


            const bounds = props.settings.location;
            const point = await getValidStreetViewLocationFromBounds(bounds);

            // const bounds = await getZipBounds(ZIP)
            // const randomPoint = getRandomLatLng(bounds)
            // const point = await getValidStreetViewLocation(ZIP)

            // Emit the address so we can use it elsewhere.
            const address = await reverseGeocode(point.lat, point.lng)
            emit('locationChosen', { lat: point.lat, lng: point.lng, address })


            if (streetViewContainer.value) {
            new google.maps.StreetViewPanorama(streetViewContainer.value, {
                position: point,
                pov: { heading: 0, pitch: 0 },
                zoom: 1,
            })
            }
        } catch (error) {
            console.error(error)
        }
    })
</script>
  

<template>
    <div class="streetview-wrapper">
        <div ref="streetViewContainer" class="streetview-content"></div>
        <div class="streetview-overlay"></div>
    </div>
</template>

<style scoped>
    .streetview-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .streetview-content {
        width: 100%;
        height: 100%;
        z-index: 0;
    }
    .streetview-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 10; 
        width: 100%;
        height: 100%;
    }
    .icon-clone {
        z-index: 20; 
    }

    @media (max-width: 768px) {
        .streetview-wrapper {
            position: relative;
            width: 100%;
            height: 100%;
         }

        .streetview-content {
            width: 100%;
            height: 100%;
            z-index: 0;
        }
        .streetview-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 10; 
            width: 100%;
            height: 100%;
        }
    }



</style>