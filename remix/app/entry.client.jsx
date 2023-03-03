import * as React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { hydrateRoot } from "react-dom/client";
import { RemixBrowser } from "@remix-run/react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ClientStyleContext from "../src/ClientStyleContext";
import createEmotionCache from "../src/createEmotionCache";

// function hydrate() {

//   startTransition(() => {
//     const customization = useSelector((state) => state.customization);

//     hydrateRoot(
//       document,
//       <StrictMode>
//         <ThemeProvider theme={theme(customization)}>
//           {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//           <CssBaseline />
//           <RemixBrowser />
//         </ThemeProvider>
//       </StrictMode>
//     );
//   });
// }

// if (typeof requestIdleCallback === "function") {
//   requestIdleCallback(hydrate);
// } else {
//   // Safari doesn't support requestIdleCallback
//   // https://caniuse.com/requestidlecallback
//   setTimeout(hydrate, 1);
// }

function ClientCacheProvider({ children }) {
  const [cache, setCache] = useState(createEmotionCache());
  const customization = useSelector((state) => state.customization);

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme(customization)}>{children}</ThemeProvider>
      </CacheProvider>
    </ClientStyleContext.Provider>
  );
}

hydrateRoot(
  <ClientCacheProvider>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <RemixBrowser />
  </ClientCacheProvider>,
  document
);
