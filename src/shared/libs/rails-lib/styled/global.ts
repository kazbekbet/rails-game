import { createGlobalStyle } from 'styled-components';

export const fonts = `
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local(''),
      url('${require('../assets/fonts/roboto-v30-latin_cyrillic-regular.woff2')}') format('woff2'),
      url('${require('../assets/fonts/roboto-v30-latin_cyrillic-regular.woff')}') format('woff');
  }

  @font-face {
    font-display: swap;
    font-family: 'Noto Sans Mono';
    font-style: normal;
    font-weight: 400;
    src: url('${require('../assets/fonts/noto-sans-mono-v21-latin_cyrillic-regular.woff2')}') format('woff2'),
      url('${require('../assets/fonts/noto-sans-mono-v21-latin_cyrillic-regular.woff')}') format('woff');
  }

  @font-face {
    font-display: swap;
    font-family: 'Noto Sans Mono';
    font-style: normal;
    font-weight: 700;
    src: url('${require('../assets/fonts/noto-sans-mono-v21-latin_cyrillic-700.woff2')}') format('woff2'),
      url('${require('../assets/fonts/noto-sans-mono-v21-latin_cyrillic-700.woff')}') format('woff');
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${fonts}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
  }

  html, input, button {
    font-family: Roboto;
  }
`;
