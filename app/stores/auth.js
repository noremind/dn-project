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

	const accessCookie = useCookie(ACCESS)

	const userCookie = useCookie(USER)

	const isAuth = computed(() => !!(token.value && user.value))
	const isToken = computed(() => !!token.value)
	const getToken = computed(() => token.value)
	const getUser = computed(() => user.value)

	const isWeb = computed(() => !isNative)

	const storageGet = async (key) => {
		if (isWeb.value) {
			if (key === ACCESS) {
				return accessCookie.value || null
			}

			if (key === USER) {
				return userCookie.value || null
			}

			return null
		}

		if (!import.meta.client) {
			return null
		}

		try {
			const res = await SecureStoragePlugin.get({ key })
			return res?.value || null
		} catch {
			const res = await Preferences.get({ key })
			return res.value || null
		}
	}

	const storageSet = async (key, value) => {
		if (isWeb.value) {
			if (key === ACCESS) {
				accessCookie.value = value
				return
			}

			if (key === USER) {
				userCookie.value = value
				return
			}

			return
		}

		if (!import.meta.client) {
			return
		}

		try {
			await SecureStoragePlugin.set({ key, value })
		} catch {
			await Preferences.set({ key, value })
		}
	}

	const storageRemove = async (key) => {
		if (isWeb.value) {
			if (key === ACCESS) {
				accessCookie.value = null
				return
			}

			if (key === USER) {
				userCookie.value = null
				return
			}

			return
		}

		if (!import.meta.client) {
			return
		}

		try {
			await SecureStoragePlugin.remove({ key })
		} catch { }

		await Preferences.remove({ key })
	}

	const parseUser = (value) => {
		if (!value) {
			return null
		}

		if (typeof value === 'object') {
			return value
		}

		try {
			return JSON.parse(value)
		} catch {
			return null
		}
	}

	const init = async () => {
		if (initPromise) {
			return initPromise
		}

		if (initialized.value) {
			return
		}

		initPromise = (async () => {
			try {
				const storedToken = await storageGet(ACCESS)
				const storedUser = await storageGet(USER)

				token.value = storedToken || null
				user.value = parseUser(storedUser)

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
		useApi().client({
			url: '/auth/logout',
			method: 'post'
		})


		token.value = null
		user.value = null

		await storageRemove(ACCESS)
		await storageRemove(USER)

		if (import.meta.client) {
			globalThis.localStorage?.removeItem('threadId')
		}

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