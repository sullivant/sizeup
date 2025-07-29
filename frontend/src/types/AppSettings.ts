export interface AppSettings {
    initialFeatures: number,
    location: {
        northeast: { lat: number, lng: number },
        southwest: { lat: number, lng: number },
    }
}
