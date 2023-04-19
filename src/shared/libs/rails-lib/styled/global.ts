import { createGlobalStyle } from 'styled-components';
import roboto_v30_latin_cyrillic_regular_woff2 from '../assets/fonts/roboto-v30-latin_cyrillic-regular.woff2';
import roboto_v30_latin_cyrillic_regular_woff from '../assets/fonts/roboto-v30-latin_cyrillic-regular.woff';
import noto_sans_mono_v21_latin_cyrillic_regular_woff2 from '../assets/fonts/noto-sans-mono-v21-latin_cyrillic-regular.woff2';
import noto_sans_mono_v21_latin_cyrillic_regular_woff from '../assets/fonts/noto-sans-mono-v21-latin_cyrillic-regular.woff';
import noto_sans_mono_v21_latin_cyrillic_700_woff2 from '../assets/fonts/noto-sans-mono-v21-latin_cyrillic-700.woff2';
import noto_sans_mono_v21_latin_cyrillic_700_woff from '../assets/fonts/noto-sans-mono-v21-latin_cyrillic-700.woff';

export const fonts = `
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local(''),
      url('${roboto_v30_latin_cyrillic_regular_woff2}') format('woff2'),
      url('${roboto_v30_latin_cyrillic_regular_woff}') format('woff');
  }

  @font-face {
    font-display: swap;
    font-family: 'Noto Sans Mono';
    font-style: normal;
    font-weight: 400;
    src: url('${noto_sans_mono_v21_latin_cyrillic_regular_woff2}') format('woff2'),
      url('${noto_sans_mono_v21_latin_cyrillic_regular_woff}') format('woff');
  }

  @font-face {
    font-display: swap;
    font-family: 'Noto Sans Mono';
    font-style: normal;
    font-weight: 700;
    src: url('${noto_sans_mono_v21_latin_cyrillic_700_woff2}') format('woff2'),
      url('${noto_sans_mono_v21_latin_cyrillic_700_woff}') format('woff');
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
