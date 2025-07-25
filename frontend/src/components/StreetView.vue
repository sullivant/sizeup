<template>
    <div>
      <p v-if="loading">Loading Street View...</p>
      <p v-if="error">{{ error }}</p>
      <div v-show="!loading && !error" ref="streetViewEl" style="width: 100%; height: 500px;" />
    </div>
</template>
  
<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  
  // Replace with your ZIP
  const zip = '06098'
  
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const streetViewEl = ref<HTMLDivElement | null>(null)
  const loading = ref(true)
  const error = ref('')
  
  type LatLng = { lat: number; lng: number }
  
    function loadGoogleMaps(): Promise<void> {
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
            console.warn(`No bounds found for ZIP ${zip}, using fallback.`)
            }
        } catch (err) {
            console.error(`Error fetching ZIP bounds:`, err)
        }

        // Fallback to Times Square, NYC bounding box
        return {
            northeast: { lat: 40.759211, lng: -73.984638 },
            southwest: { lat: 40.755647, lng: -73.990349 }
        }
    }


  
  function getRandomLatLng(bounds: { northeast: LatLng; southwest: LatLng }): LatLng {
    const lat = bounds.southwest.lat + Math.random() * (bounds.northeast.lat - bounds.southwest.lat)
    const lng = bounds.southwest.lng + Math.random() * (bounds.northeast.lng - bounds.southwest.lng)
    return { lat, lng }
  }
  
  async function isStreetViewAvailable(lat: number, lng: number): Promise<boolean> {
    const url = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&key=${apiKey}`
    const res = await fetch(url)
    const data = await res.json()
    return data.status === 'OK'
  }
  
  async function getValidStreetViewLocation(zip: string, maxTries = 10): Promise<LatLng> {
    const bounds = await getZipBounds(zip)
    for (let i = 0; i < maxTries; i++) {
      const point = getRandomLatLng(bounds)
      const available = await isStreetViewAvailable(point.lat, point.lng)
      if (available) return point
    }
    throw new Error(`No Street View found in ZIP ${zip} after ${maxTries} tries`)
  }
  
  async function initStreetView() {
    try {
      await loadGoogleMaps()
      const point = await getValidStreetViewLocation(zip)
  
      if (streetViewEl.value) {
        new google.maps.StreetViewPanorama(streetViewEl.value, {
          position: point,
          pov: { heading: 0, pitch: 0 },
          zoom: 1,
        })
      }
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }
  
  onMounted(() => {
    initStreetView()
  })
  </script>
  