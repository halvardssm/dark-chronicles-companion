import * as React from "react";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "styled-components";
import { defaultTheme, GlobalStyle } from "../style/theme";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  skipHeader?: boolean;
  skipFooter?: boolean;
  debug?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  skipHeader,
  skipFooter,
  debug = false,
}) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Helmet>
      </Helmet>
      <GlobalStyle />
      {!skipHeader && (
        <Header />
      )}
      {children}
      {!skipFooter && (
        <Footer />
      )}
    </ThemeProvider>
  );
};
