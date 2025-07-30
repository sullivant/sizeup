export interface MenuItem {
    label: string
    icon: {type: string, name: string}
    action: () => void
}