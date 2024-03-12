// theme.js
import { BlueTheme, PurpleTheme } from "./themeColor";
import cssVars from "css-vars-ponyfill";

const getThemeVariables = (theme) => {
	switch (theme) {
		case "blue":
			return BlueTheme;
		case "purple":
			return PurpleTheme;
		default:
			return BlueTheme;
	}
};
function getThemeMode(theme) {
		switch (theme) {
			case "blue":
				return "blue";
			case "purple":
				return "purple";
			default:
				return "blue";
		}
	}
export const initTheme = (theme) => {
	document.documentElement.setAttribute("data-theme", getThemeMode(theme));
	cssVars({
		watch: true,
		variables: getThemeVariables(theme),
		onlyLegacy: true,
		// onlyLegacy: false,
	});
};
