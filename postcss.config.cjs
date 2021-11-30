const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const importCss = require('postcss-import')
const nested = require('postcss-nested')
//const postcssNesting = require('postcss-nesting')


const config = {
  plugins: [
    
    importCss(),
    nested(),
    //postcssNesting(),
    //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    tailwindcss(),

    //But others, like autoprefixer, need to run after,
    autoprefixer(),
   
      // cssnano({
      //   preset: 'default',
      // }),
  ],
}

module.exports = config
