
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  	"./index.html",
  	"./src/**/*.jsx"
  ],
  theme: {
    extend: {
    	colors: {
    		"bluegray-50": "#ECEFF1",
    		"bluegray-100": "#CFD8DC",
    		"vibrant": "#e81840",
    		"vibrant-dark": "#103040",
    		"muted": "#688088",
    		"muted-light": "#b8d8e0",
    		"gray-350": "#bebebe"
    	}
    },
  },
  plugins: [],
}

