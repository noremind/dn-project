import { Browser } from "@capacitor/browser";

export async function useBrowser(url, type = "_system") {
	await Browser.open({
		url,
		windowName: type,
	});
}
