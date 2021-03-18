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
        dark: '#455a64',
        'jaffa': {  DEFAULT: '#ED8936',  '50': '#FFFFFF',  '100': '#FEF7F1',  '200': '#FADBC2',  '300': '#F5C094',  '400': '#F1A465',  '500': '#ED8936',  '600': '#DC6F14',  '700': '#AD5710',  '800': '#7F400B',  '900': '#502807'},
        'papaOrange': {
          '50':  '#f9f4e5',
          '100': '#faedc3',
          '200': '#f7e289',
          '300': '#f3cc45',
          '400': '#eead18',
          '500': '#fa8a23',
          '600': '#de6506',
          '700': '#be4c0b',
          '800': '#9d3c11',
          '900': '#813113',
        },
        'papaDark': {
          '50':  '#2faa64',
          '100': '#e2f8ef',
          '200': '#bff2d9',
          '300': '#89e8bc',
          '400': '#39d58d',
          '500': '#14bc5d',
          '600': '#109f42',
          '700': '#2a7952',
          '800': '#176335',
          '900': '#154f2e',
        },
        'cerise': {
          '50':  '#fdf9f9',
          '100': '#fdeef5',
          '200': '#fbcceb',
          '300': '#fba0da',
          '400': '#fc65bd',
          '500': '#fd3b9b',
          '600': '#dc046b',
          '700': '#e11a59',
          '800': '#b61643',
          '900': '#901334',
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
