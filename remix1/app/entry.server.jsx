// import { PassThrough } from "stream";

// import { Response } from "@remix-run/node";
// import { RemixServer } from "@remix-run/react";
// import isbot from "isbot";
// import { renderToPipeableStream } from "react-dom/server";

// const ABORT_DELAY = 5000;

// export default function handleRequest(
//   request,
//   responseStatusCode,
//   responseHeaders,
//   remixContext
// ) {
//   return isbot(request.headers.get("user-agent"))
//     ? handleBotRequest(
//         request,
//         responseStatusCode,
//         responseHeaders,
//         remixContext
//       )
//     : handleBrowserRequest(
//         request,
//         responseStatusCode,
//         responseHeaders,
//         remixContext
//       );
// }

// function handleBotRequest(
//   request,
//   responseStatusCode,
//   responseHeaders,
//   remixContext
// ) {
//   return new Promise((resolve, reject) => {
//     let didError = false;

//     const { pipe, abort } = renderToPipeableStream(
//       <RemixServer context={remixContext} url={request.url} />,
//       {
//         onAllReady() {
//           const body = new PassThrough();

//           responseHeaders.set("Content-Type", "text/html");

//           resolve(
//             new Response(body, {
//               headers: responseHeaders,
//               status: didError ? 500 : responseStatusCode,
//             })
//           );

//           pipe(body);
//         },
//         onShellError(error) {
//           reject(error);
//         },
//         onError(error) {
//           didError = true;

//           console.error(error);
//         },
//       }
//     );

//     setTimeout(abort, ABORT_DELAY);
//   });
// }

// function handleBrowserRequest(
//   request,
//   responseStatusCode,
//   responseHeaders,
//   remixContext
// ) {
//   return new Promise((resolve, reject) => {
//     let didError = false;

//     const { pipe, abort } = renderToPipeableStream(
//       <RemixServer context={remixContext} url={request.url} />,
//       {
//         onShellReady() {
//           const body = new PassThrough();

//           responseHeaders.set("Content-Type", "text/html");

//           resolve(
//             new Response(body, {
//               headers: responseHeaders,
//               status: didError ? 500 : responseStatusCode,
//             })
//           );

//           pipe(body);
//         },
//         onShellError(err) {
//           reject(err);
//         },
//         onError(error) {
//           didError = true;

//           console.error(error);
//         },
//       }
//     );

//     setTimeout(abort, ABORT_DELAY);
//   });
// }

import { renderToString } from "react-dom/server";
import { RemixServer } from "@remix-run/react";

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';

const key = 'custom';
const cache = createCache({ key });
const {
  extractCriticalToChunks,
  constructStyleTagsFromChunks,
} = createEmotionServer(cache);

export default function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  remixContext
) {
  let markup = renderToString(
    <CacheProvider value={cache}>
      <RemixServer context={remixContext} url={request.url} />
    </CacheProvider>
  );

  const chunks = extractCriticalToChunks(markup);
  const styles = constructStyleTagsFromChunks(chunks);

  markup = markup.replace('__STYLES__', styles);

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}