import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import flush from "styled-jsx/server";

export default class MyDocument extends Document {
  render() {
    const { pageContext, localeDataScript, locale } = this.props;
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${locale}`;
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />

          <meta
            name="theme-color"
            content={
              pageContext ? pageContext.theme.palette.primary.main : null
            }
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <link
            href="https://cdn.rawgit.com/rastikerdar/shabnam-font/v4.0.0/dist/font-face.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        <body dir="rtl">
          <NextScript />
          <Main />
          <script src={polyfill} />
          <script
            dangerouslySetInnerHTML={{
              __html: localeDataScript
            }}
          />
        </body>
      </html>
    );
  }

  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const {
      req: { locale, localeDataScript }
    } = context;

    let dir = context.req.messages["config.dir"];

    let pageContext;

    let css;
    if (pageContext) {
      css = pageContext.sheetsRegistry.toString();
    }

    return {
      ...props,
      dir,
      locale,
      localeDataScript,
      pageContext,
      styles: (
        <React.Fragment>
          <style
            id="jss-server-side"
            dangerouslySetInnerHTML={{ __html: css }}
          />
          {flush() || null}
        </React.Fragment>
      )
    };
  }
}
