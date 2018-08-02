import express from "express";
import cors from "cors";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import serialize from "serialize-javascript";
import { CookiesProvider } from 'react-cookie';
import App from '../shared/App';
import routes from '../shared/routes';

const app = express();
const cookiesMiddleware = require('universal-cookie-express')

app.use(cors());
app.use(cookiesMiddleware());
app.use(express.static("public"));

app.get("*", (req, res, next) => {
  global.myOrigin = req.protocol + "://" + req.headers.host;
  const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};

  const promise = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.universalCookies.get('access_token'), req.path)
    : Promise.resolve()

  promise.then((data) => {
    const context = { data }
    const markup = renderToString(
      <CookiesProvider cookies={req.universalCookies}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </CookiesProvider>
    )

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="icon" href="/favicon.ico">
          <meta name="author" content="Jostein Øygarden">
          <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">
          <link rel="stylesheet" type="text/css" href="/css/react-input-calendar.css">
          <link rel="stylesheet" type="text/css" href="/css/image-gallery.css">
          <link rel="stylesheet" type="text/css" href="/css/react-bootstrap-table.css">
          <link rel="stylesheet" type="text/css" href="/css/buldreinfo.css">
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>

        <body>
          <div id="app">${markup}</div>
        </body>
      </html>
    `)
  }).catch((error)=>console.warn(error))
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`)
})
