/**
 * helper methods to wrap access to browser localStorage for per-browser settings.
 */
export default class LocalStorageHelper {
    static setUseLocalStorageForPanelExpansion(enabled: boolean) {
        if (enabled) {
            localStorage.setItem('useLocalStorageForPanelExpansion', 'Y')
        } else {
            localStorage.removeItem('useLocalStorageForPanelExpansion')
        }
    }

    static isUseLocalStorageForPanelExpansion(): boolean {
        return localStorage.getItem('useLocalStorageForPanelExpansion') === 'Y'
    }

    static setDashboardNonExpandPanels(value: any) {
        localStorage.setItem('dashboard.nonExpandPanels', JSON.stringify(value))
    }

    static getDashboardNonExpandPanels(): any | null {
        try {
            let value = localStorage.getItem('dashboard.nonExpandPanels')
            if (value) {
                return JSON.parse(value)
            }
        } catch (err) {
            console.error('error parsing dashboard.nonExpandPanels from localStorage')
        }

        return null
    }
}
