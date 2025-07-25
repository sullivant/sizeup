export interface ScenarioEnvironment {
    timeOfDay: 'Morning' | 'Afternoon' | 'Evening' | 'Night'
    weather: 'Clear' | 'Rain' | 'Snow' | 'Fog' | 'Storm'
    temperature: number
    date: string
}
