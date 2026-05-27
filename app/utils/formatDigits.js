export function formatDigits(price) {
	let amountStr = Math.floor(price).toString();
	return amountStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}