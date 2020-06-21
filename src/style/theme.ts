import { createGlobalStyle } from "styled-components";

export type GlobalStyleProps = {
  theme: typeof defaultTheme;
};

export const defaultTheme = {
  breakpoints: [0],
  colors: {
    background: "#ffffff",
    primary: "#5C63FF",
    text: "#000000",
  },
  fonts: {
    body: '"Montserrat", sans-serif',
  },
};

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    min-height: 100vh;
  }

  ::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
  }
  /* Optional: show position indicator in red */
  ::-webkit-scrollbar-thumb {
      background: #FF0000;
  }
`;
