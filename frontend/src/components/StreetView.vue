<template>
    <div>
      <p v-if="loading">Loading Street View...</p>
      <p v-if="error">{{ error }}</p>
      <div ref="streetViewEl" style="width: 100%; height: 500px;" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  
  type LatLng = { lat: number; lng: number }
  
  const streetViewEl = ref<HTMLDivElement | null>(null)
  const loading = ref(true)
  const error = ref('')
  
  // Replace with your ZIP and API key
  const zip = '06098'
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  
  const zipBoundsCache = new Map<string, { northeast: LatLng; southwest: LatLng }>()
  
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
      script.onerror = () => reject(new Error('Google Maps failed to load'))
      document.head.appendChild(script)
    })
  }
  
  async function getZipBounds(zip: string): Promise<{ northeast: LatLng; southwest: LatLng }> {
    if (zipBoundsCache.has(zip)) return zipBoundsCache.get(zip)!
  
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${zip}&key=${apiKey}`
    )
    const data = await res.json()
  
    const bounds = data.results?.[0]?.geometry?.bounds
    if (!bounds) throw new Error(`Could not get bounds for ZIP ${zip}`)
  
    const result = { northeast: bounds.northeast, southwest: bounds.southwest }
    zipBoundsCache.set(zip, result)
    return result
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
  
  async function getValidStreetViewPoint(zip: string, maxTries = 10): Promise<LatLng> {
    const bounds = await getZipBounds(zip)
    for (let i = 0; i < maxTries; i++) {
      const point = getRandomLatLng(bounds)
      const available = await isStreetViewAvailable(point.lat, point.lng)
      if (available) return point
    }
    throw new Error(`No Street View imagery found in ZIP ${zip}`)
  }
  
  async function initStreetView() {
    try {
      await loadGoogleMaps()
      const point = await getValidStreetViewPoint(zip)
  
      if (streetViewEl.value) {
        new google.maps.StreetViewPanorama(streetViewEl.value, {
          position: point,
          pov: { heading: 34, pitch: 10 },
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
  