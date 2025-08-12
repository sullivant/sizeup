export interface AppSettings {
    enabledDispatch: number,
    enabledOnScene: number,
    location: {
        northeast: { lat: number, lng: number },
        southwest: { lat: number, lng: number },
    }
}
