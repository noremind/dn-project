import { useProjectStore } from "~/stores/project";

export function useSeo({ title, description, image }) {
	const project = useProjectStore()
	let preview = `${project.domainURL}/assets/images/logo/DN-Project-Rounded.png`;

	useSeoMeta({
		title: `${project.projectName} - ${title}`,
		ogTitle: `${project.projectName} - ${title}`,
		description: description,
		ogDescription: description,
		image: image || preview,
		ogImage: image || preview,
	});
}