import { defineStore } from 'pinia'
import { ref } from 'vue'

// SSR note: localStorage is only available in the browser, so the store starts empty
// (identical on server and client) and `hydrate()` loads the saved token afterwards.
export const useAdminStore = defineStore('admin', () => {
    const token = ref(null)
    const isAuthenticated = ref(false)

    function hydrate() {
        if (import.meta.server || token.value) return
        try {
            const saved = localStorage.getItem('mavlono_admin_token')
            if (saved) {
                token.value = saved
                isAuthenticated.value = true
            }
        } catch (e) { /* storage unavailable */ }
    }

    function login(newToken) {
        token.value = newToken
        isAuthenticated.value = true
        localStorage.setItem('mavlono_admin_token', newToken)
    }

    function logout() {
        token.value = null
        isAuthenticated.value = false
        localStorage.removeItem('mavlono_admin_token')
    }

    return { token, isAuthenticated, hydrate, login, logout }
})
