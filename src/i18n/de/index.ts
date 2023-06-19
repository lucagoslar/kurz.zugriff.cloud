import type { Translation } from '../i18n-types.js';

const de: Translation = {
	// this is an example Translation, just rename or delete this folder if you want
	Locale: {
		title: 'Kurz und knapp.',
		form: {
			short_url: {
				label: 'Pfadsegment',
				error: 'Bitte verwende ausschließlich alphanumerische Zeichen und Bindestriche.'
			},
			url: {
				label: 'Ursprüngliche URL',
				error: 'Bitte überprüfe die URL auf ihre Gültigkeit.'
			},
			register: 'Eintragen',
			error: 'Etwas ist schiefgegangen.',
			success: 'Kurz-URL wurde unter "{url}" erstellt.',
			exists: 'Es existiert bereits eine Kurz-URL unter diesem Pfadsegment.'
		},
		Reference: {
			Error: {
				not_found: '404. Kurz-URL konnte nicht zugeordnet werden.'
			},
			title: 'Externer Link',
			follow_link: 'Link folgen'
		}
	},
	story: {
		button: '{times} mal geklickt'
	}
};

export default de;
