import { Capacitor } from '@capacitor/core'
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin'
import { Preferences } from '@capacitor/preferences'
import { initPushNotifications, sendStoredPushToken } from '@/services/pushNotifications.js'

export const useAuthStore = defineStore('auth', () => {
	const ACCESS = 'access_token'
	const USER = 'user_info'

	const token = ref(null)
	const user = ref(null)
	const initialized = ref(false)
	let initPromise = null

	const router = useRouter()
	const isNative = Capacitor.isNativePlatform()

	const accessCookie = useCookie(ACCESS, {
		maxAge: 60 * 60 * 24 * 30,
		path: '/',
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production'
	})

	const isAuth = computed(() => !!(token.value && user.value))
	const isToken = computed(() => !!token.value)
	const getToken = computed(() => token.value)
	const getUser = computed(() => user.value)

	const storageGet = async (key) => {
		if (!isNative && key === ACCESS) {
			return accessCookie.value || null
		}

		if (!import.meta.client || !isNative) { return null }

		try {
			const res = await SecureStoragePlugin.get({ key })
			return res?.value || null
		} catch {
			const res = await Preferences.get({ key })
			return res.value || null
		}
	}

	const storageSet = async (key, value) => {
		if (!isNative && key === ACCESS) {
			accessCookie.value = value
			return
		}

		if (!import.meta.client || !isNative) { return }

		try {
			await SecureStoragePlugin.set({ key, value })
		} catch {
			await Preferences.set({ key, value })
		}
	}

	const storageRemove = async (key) => {
		if (!isNative && key === ACCESS) {
			accessCookie.value = null
			return
		}

		if (!import.meta.client || !isNative) { return }

		try {
			await SecureStoragePlugin.remove({ key })
		} catch { }

		await Preferences.remove({ key })
	}

	const init = async () => {
		if (initPromise) { return initPromise }
		if (initialized.value && (user.value || (!token.value && !(import.meta.client && isNative)))) { return }

		initPromise = (async () => {
			try {
				const storedToken = await storageGet(ACCESS)
				token.value = storedToken || token.value || null

				if (import.meta.client && isNative && !user.value) {
					const storedUser = await storageGet(USER)

					try {
						user.value = storedUser ? JSON.parse(storedUser) : null
					} catch {
						user.value = null
					}
				}

				if (!user.value && token.value) {
					try {
						await setUser()
					} catch (error) {
						console.error('[auth] restore profile failed', error)
					}
				}
			} catch (error) {
				token.value = null
				user.value = null
				console.error('[auth] init failed', error)
			} finally {
				initialized.value = true
				initPromise = null
			}
		})()

		return initPromise
	}

	init()

	const saveUserData = async (data) => {
		user.value = data
		await storageSet(USER, JSON.stringify(data))
	}

	const setUser = async (path) => {
		const res = await useApi().client({
			url: '/auth/profile',
			method: 'get'
		})

		await saveUserData(res.user)

		if (path) {
			router.push(path)
		}
	}

	const setToken = async (payload, path = null) => {
		token.value = payload

		await storageSet(ACCESS, payload)

		try {
			await setUser(path)
		} catch (error) {
			console.error('[auth] profile failed', error)
		}

		try {
			await sendStoredPushToken()
		} catch (error) {
			console.error('[push] send stored token failed', error)
		}

		if (isNative) {
			await initPushNotifications().catch((error) => {
				console.error('[push] auth registration failed', error)
			})
		}
	}

	const logout = async () => {
		token.value = null
		user.value = null

		try {
			await useApi().client({
				url: '/auth/logout',
				method: 'post'
			})
		} catch { }

		await storageRemove(ACCESS)
		await storageRemove(USER)
		globalThis.localStorage?.removeItem('threadId')

		router.push('/login')
	}

	return {
		user,
		token,
		isAuth,
		isToken,
		getToken,
		getUser,
		initialized,
		init,
		setToken,
		setUser,
		logout
	}
})
