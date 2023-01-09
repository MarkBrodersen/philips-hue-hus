/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			boxShadow: {
				container:
					'0px 8px 32px rgba(12, 10, 9, 0.25), inset 0px -1px 2px rgba(250, 250, 249, 0.15), inset 0px 4px 8px rgba(250, 250, 249, 0.1), inset 0px -4px 8px rgba(28, 25, 23, 0.25), inset 0px -8px 16px rgba(28, 25, 23, 0.25)',
				pink: '0px 8px 32px rgba(190, 24, 93, 0.25), inset 0px -1px 2px rgba(255, 255, 255, 0.6), inset 0px 4px 8px rgba(253, 242, 248, 0.5), inset 0px -4px 8px rgba(190, 24, 93, 0.3), inset 0px -8px 16px rgba(190, 24, 93, 0.25)',
				pinkglow:
					'0px 2px 16px #831843, 0px 2px 32px #F9A8D470, inset 0px -1px 2px rgba(255, 255, 255, 0.6), inset 0px 4px 8px rgba(253, 242, 248, 0.5), inset 0px -4px 8px rgba(190, 24, 93, 0.3), inset 0px -8px 16px rgba(190, 24, 93, 0.25)',
			},
			strokeWidth: {
				3: '3',
			},
		},
	},
	plugins: [],
}
