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
        primary: theme.designSystem.colors.primaryGreen,
        secondary: theme.designSystem.colors.secondaryGreen,
        accent: theme.designSystem.colors.accentYellow,
        'neutral-white': theme.designSystem.colors.neutralWhite,
        'neutral-off-white': theme.designSystem.colors.neutralOffWhite,
        'neutral-gray-light': theme.designSystem.colors.neutralGrayLight,
        'neutral-gray': theme.designSystem.colors.neutralGray,
        'neutral-dark': theme.designSystem.colors.neutralDark,
        success: theme.designSystem.colors.successGreen,
        error: theme.designSystem.colors.errorRed,
        warning: theme.designSystem.colors.warningOrange,
        info: theme.designSystem.colors.infoBlue,
      },
      borderRadius: {
        sm: theme.designSystem.borderRadius.small,
        md: theme.designSystem.borderRadius.medium,
        lg: theme.designSystem.borderRadius.large,
        xl: theme.designSystem.borderRadius.xlarge,
      },
      boxShadow: {
        card: theme.designSystem.shadows.card,
        button: theme.designSystem.shadows.button,
        hover: theme.designSystem.shadows.hover,
      }
    },
  },
  plugins: [],
}
