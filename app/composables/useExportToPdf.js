export async function useExportToPdf(id, name) {
	const { $html2pdf } = useNuxtApp()
	const element = document.getElementById(id)
	const opt = {
		margin: [10, 10, 10, 10],
		filename: `${name}.pdf`,
		image: { type: 'jpeg', quality: 0.98 },
		html2canvas: {
			scale: 2,
			useCORS: true,
		},
		jsPDF: {
			unit: 'mm',
			format: 'a4',
			orientation: 'portrait',
		},
		pagebreak: { mode: ['css', 'legacy'] },
	}

	await $html2pdf().set(opt).from(element).save()
}
