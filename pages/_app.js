import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { MuiThemeProvider, jssPreset } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import rtl from "jss-rtl";
import { IntlProvider, addLocaleData } from "react-intl";
import { Provider } from "mobx-react";
import { getSnapshot } from "mobx-state-tree";
import { initializeStore } from "../store";
import { SnackbarProvider } from "notistack";
import { SheetsRegistry } from "jss";
import {
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";
import { teal, amber } from "@material-ui/core/colors";

if (typeof window !== "undefined" && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const { req } = ctx;
    const { locale, messages } = req || window.__NEXT_DATA__.props;

    const dir = "rtl";

    const isServer = !!req;
    const store = initializeStore(isServer);
    return {
      pageProps,
      initialState: getSnapshot(store),
      isServer,
      locale,
      messages,
      dir
    };
  }

  constructor(props) {
    super(props);
    this.store = initializeStore(props.isServer, props.initialState);
    const mDir = props.dir;

    const theme = createMuiTheme({
      direction: mDir,
      palette: {
        primary: {
          light: teal[400],
          main: teal[500],
          dark: teal[600]
        },
        secondary: {
          light: amber[300],
          main: amber[500],
          dark: amber[700]
        }
      },
      typography: {
        useNextVariants: true
      }
    });

    const mContext = {
      theme,
      sheetsManager: new Map(),
      sheetsRegistry: new SheetsRegistry(),
      generateClassName: createGenerateClassName()
    };

    if (!process.browser) {
      this.pageContext = mContext;
    }

    this.pageContext = mContext;
  }

  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, locale, messages } = this.props;
    return (
      <Provider store={this.store}>
        <IntlProvider key={locale} locale={locale} messages={messages}>
          <Container>
            <Head>
              <title>کاربرباز</title>
            </Head>
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              <CssBaseline />
              <JssProvider
                jss={jss}
                registry={this.pageContext.sheetsRegistry}
                generateClassName={this.pageContext.generateClassName}
              >
                <SnackbarProvider
                  maxSnack={3}
                  autoHideDuration={6000}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                  }}
                >
                  <Component pageContext={this.pageContext} {...pageProps} />
                </SnackbarProvider>
              </JssProvider>
            </MuiThemeProvider>
          </Container>
        </IntlProvider>
      </Provider>
    );
  }
}

export default MyApp;
