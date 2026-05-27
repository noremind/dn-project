import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import { Preferences } from "@capacitor/preferences";

const PUSH_TOKEN_KEY = "fcm_push_token";
const FID_KEY = "firebase_installation_id";
let isPushInitialized = false;
let registrationPromise = null;
const fidListeners = [];

function isNativePlatform() {
	return Capacitor.isNativePlatform();
}

export async function initPushNotifications() {
	if (!isNativePlatform() || isPushInitialized) {
		return registrationPromise;
	}

	isPushInitialized = true;

	registrationPromise = new Promise(async (resolve, reject) => {
		try {
			await PushNotifications.removeAllListeners();

			await PushNotifications.addListener("registration", async (token) => {
				const platform = Capacitor.getPlatform();
				console.log(`[push:${platform}] registration token`, token.value);

				// if (token.value) {
				// 	await Preferences.set({ key: PUSH_TOKEN_KEY, value: token.value });
				// 	await sendPushTokenToBackend(token.value);
				// }

				resolve({
					token: token.value,
					provider: platform === "ios" ? "apns" : "fcm",
					platform,
				});
			});

			await PushNotifications.addListener("registrationError", (error) => {
				console.error("[push] registration error", error);
				isPushInitialized = false;
				reject(error);
			});

			await PushNotifications.addListener(
				"pushNotificationReceived",
				(notification) => {
					console.log("[push] notification received", notification);
				},
			);

			await PushNotifications.addListener(
				"pushNotificationActionPerformed",
				(event) => {
					console.log("[push] notification action performed", event);
				},
			);

			const permission = await PushNotifications.requestPermissions();
			if (permission.receive !== "granted") {
				isPushInitialized = false;
				resolve(null);
				return;
			}

			await PushNotifications.register();
		} catch (error) {
			console.error("[push] init failed", error);
			isPushInitialized = false;
			reject(error);
		}
	});

	return registrationPromise;
}

export async function getStoredFid() {
	try {
		const stored = await Preferences.get({ key: FID_KEY });
		return stored.value || null;
	} catch (error) {
		console.error("[fid] get stored fid failed", error);
		return null;
	}
}

export function onFidChange(callback) {
	fidListeners.push(callback);
	return () => {
		const index = fidListeners.indexOf(callback);
		if (index !== -1) fidListeners.splice(index, 1);
	};
}

export async function checkFidChange() {
	const current = await getStoredFid();
	if (current) {
		fidListeners.forEach((cb) => cb(current));
	}
}

export async function sendStoredPushToken() {
	try {
		const stored = await Preferences.get({ key: PUSH_TOKEN_KEY });
		if (!stored.value) {
			return null;
		}
		// const response = await Api.user.postUsersDevices({ token: stored.value });
		console.log("[push] stored token sent to backend");
		return response;
	} catch (error) {
		console.error("[push] send stored token failed", error);
		throw error;
	}
}

async function sendPushTokenToBackend(token) {
	try {
		// await Api.user.postUsersDevices({ token });
		console.log("[push] stored token sent to backend");
	} catch (error) {
		console.error("[push] send stored token failed", error);
	}
}
