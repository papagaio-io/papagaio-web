module.exports = {
  theme: {
    extend: {
      container: {
        center: true,
        padding: '4rem',
      },
      fontFamily: {
          'sans': ['Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']
      },
      borderWidth: {
        default: '1px',
        '0': '0',
        '2': '2px',
        '4': '4px',
        '5': '5px',
        '6': '6px',
      },
      spacing: {
        px: '1px',
        '2px': '2px',
        '3px': '3px',
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
        '40': '10rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
      },
      colors: {
        dark: '#4a4a4a',
        'jaffa': {  DEFAULT: '#ED8936',  '50': '#FFFFFF',  '100': '#FEF7F1',  '200': '#FADBC2',  '300': '#F5C094',  '400': '#F1A465',  '500': '#ED8936',  '600': '#DC6F14',  '700': '#AD5710',  '800': '#7F400B',  '900': '#502807'},
        'papaOrange': {
          '50':  '#faf5e9',
          '100': '#fbedcc',
          '200': '#f8df99',
          '300': '#f5c856',
          '400': '#f1a421',
          '500': '#f07f0e',
          '600': '#f37021',
          '700': '#c5440e',
          '800': '#a23615',
          '900': '#852c15',
        },
        'papaDark': {
          '50':  '#f6fafa',
          '100': '#eef7f6',
          '200': '#d8ecea',
          '300': '#b8dbdd',
          '400': '#7fbbc4',
          '500': '#4a96a5',
          '600': '#357281',
          '700': '#455a64',
          '800': '#27444d',
          '900': '#20363d',
        },
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'disabled'],
    borderColor: ['responsive', 'hover', 'focus', 'disabled'],
    boxShadow: ['responsive', 'hover', 'focus', 'disabled'],
    cursor: ['responsive', 'disabled'],
    opacity: ['responsive', 'disabled'],
    textColor: ['responsive', 'hover', 'focus', 'disabled'],
  },
  plugins: [
    function ({ addVariant, e }) {
      addVariant('disabled', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`disabled${separator}${className}`)}:disabled`
        })
      })
    }
  ]
}
