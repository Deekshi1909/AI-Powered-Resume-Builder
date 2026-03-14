module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C3E50',
        secondary: '#3498DB',
        accent: '#E74C3C',
        success: '#27AE60',
        warning: '#F39C12',
        light: '#ECF0F1',
        dark: '#34495E'
      },
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif']
      }
    }
  },
  plugins: []
}
