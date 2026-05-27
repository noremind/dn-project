export function useSeo({ title, description, image }) {
	let preview = "https://cityhelp-diploma-yij7.vercel.app/assets/images/logo/logo-full.png";

	useSeoMeta({
		title: `DN Project - ${title}`,
		ogTitle: `DN Project - ${title}`,
		description: description,
		ogDescription: description,
		image: image || preview,
		ogImage: image || preview,
	});
}