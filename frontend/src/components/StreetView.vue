<script setup lang="ts">
    import { onMounted, ref } from 'vue'

    const streetViewContainer = ref<HTMLDivElement | null>(null)
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    // Hardcoded ZIP code to pick a random spot in
    const ZIP = '10001' // NYC Midtown

    type LatLng = { lat: number; lng: number }


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

    // Fetch bounding box (viewport or bounds) for ZIP
    async function getZipBounds(zip: string): Promise<{ northeast: LatLng; southwest: LatLng }> {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${zip}|country:US&key=${apiKey}`
        try {
            const res = await fetch(url)
            const data = await res.json()

            const result = data.results?.[0]
            const bounds = result?.geometry?.bounds || result?.geometry?.viewport

            if (bounds) {
            return bounds
            } else {
                console.warn(`No bounds found for ZIP ${zip}, defaulting to manual bounds.`)
            }
        } catch (err) {
            console.error('Error fetching ZIP bounds:', err)
        }

        // Local bounding box fallback
        return {
            northeast: { lat: 41.9267214, lng: -73.0758478 },
            southwest: { lat: 41.9087362, lng: -73.0943926 },
        }
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

    async function getValidStreetViewLocation(zip: string, maxTries = 10): Promise<LatLng> {
        const bounds = await getZipBounds(zip)
        for (let i = 0; i < maxTries; i++) {
            const point = getRandomLatLng(bounds)
            if (await isStreetViewAvailable(point.lat, point.lng)) {
            return point
            }
        }
        // fallback coordinate if no valid point found
        return {
            lat: 40.758, // Times Square fallback
            lng: -73.9855,
        }
    }

    onMounted(async () => {
        try {
            await loadGoogleMapsApi()

            // const bounds = await getZipBounds(ZIP)
            // const randomPoint = getRandomLatLng(bounds)
            const point = await getValidStreetViewLocation(ZIP)

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
    <div ref="streetViewContainer" style="width: 100%; height: 500px;"></div>
</template>