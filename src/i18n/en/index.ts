import type { BaseTranslation } from '../i18n-types.js';

const en: BaseTranslation = {
	// TODO: your translations go here
	Locale: {
		title: 'To the point.',
		form: {
			short_url: {
				label: 'Slug',
				error: 'Please use alphanumeric characters and hyphens only.'
			},
			url: {
				label: 'Original URL',
				error: 'Please check the URL for its validity.'
			},
			register: 'Register',
			error: 'Something went wrong.',
			success: 'Created short URL at "{url:string}".',
			exists: 'There already is a short URL registered with this slug.'
		},
		Reference: {
			Error: {
				not_found: '404. Could not match slug.'
			},
			title: 'External URL',
			follow_link: 'Follow URL'
		}
	},
	story: {
		button: 'Clicked {times:number} times'
	}
};

export default en;
