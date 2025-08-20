export interface AppSettings {
    enabledDispatch: number,
    enabledOnScene: number,
    deptName: string,
    location: {
        northeast: { lat: number, lng: number },
        southwest: { lat: number, lng: number },
    }
}
