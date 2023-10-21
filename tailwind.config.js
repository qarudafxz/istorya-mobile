/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			color: {
				primary: "#FF60DD",
				secondary: "#BD0DFF",
			},
			textColor: {
				primary: "#FF60DD",
				secondary: "#BD0DFF",
			},
			backgroundColor: {
				primary: "#FF60DD",
				secondary: "#BD0DFF",
			},
			borderColor: {
				primary: "#FF60DD",
				secondary: "#BD0DFF",
			},
		},
	},
	plugins: [],
};
