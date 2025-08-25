/** @type {import('tailwindcss').Config} */
const theme = require("./lib/ai_theme_rules.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryGreen: theme.designSystem.colors.primaryGreen,
        secondaryGreen: theme.designSystem.colors.secondaryGreen,
        accentYellow: theme.designSystem.colors.accentYellow,
        neutralWhite: theme.designSystem.colors.neutralWhite,
        neutralOffWhite: theme.designSystem.colors.neutralOffWhite,
        neutralGrayLight: theme.designSystem.colors.neutralGrayLight,
        neutralGray: theme.designSystem.colors.neutralGray,
        neutralDark: theme.designSystem.colors.neutralDark,
        successGreen: theme.designSystem.colors.successGreen,
        errorRed: theme.designSystem.colors.errorRed,
        warningOrange: theme.designSystem.colors.warningOrange,
        infoBlue: theme.designSystem.colors.infoBlue,
      },
      borderRadius: {
        ...theme.designSystem.borderRadius,
      },
      boxShadow: {
        ...theme.designSystem.shadows,
      },
      ...theme.designSystem.typography,
      ...theme.designSystem.elementStyling,
    },
  },
  plugins: [],
}
