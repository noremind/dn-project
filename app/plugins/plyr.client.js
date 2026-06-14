import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

export default defineNuxtPlugin(() => {
	return {
		provide: {
			plyr: Plyr
		}
	}
})
