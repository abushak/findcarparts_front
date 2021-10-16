const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		container: {
			padding: {
			  DEFAULT: '1rem',
			  sm: '2rem',
			  lg: '4rem',
			  xl: '5rem',
			  '2xl': '6rem',
			  center: true,
			},
		  },
	  extend: {},
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')],
  }
  
  module.exports = config
  