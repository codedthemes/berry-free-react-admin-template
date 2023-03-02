import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { store } from "./store";
import { Provider } from "react-redux";
import globalStyles from "./styles/style.css";
import scrollBarStyle from "../node_modules/react-perfect-scrollbar/dist/css/styles.css";
export const links = () => [
  {
    rel: "stylesheet",
    href: globalStyles,
  },
  {
    rel: "stylesheet",
    href: scrollBarStyle,
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap",
  },
];

export const meta = () => ({
  charset: "utf-8",
  title: "Berry - React Material Admin Dashboard Template",
  viewport: "width=device-width,initial-scale=1",
  description:
    "Start your next React project with Berry admin template. It build with Reactjs, Material-UI, Redux, and Hook for faster web development.",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <meta name="theme-color" content="#2296f3" />
        <meta
          name="keywords"
          content="react admin template, material-ui react dashboard template, reactjs admin template, reactjs dashboard, react backend template"
        />
        <meta name="author" content="CodedThemes" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://berrydashboard.io/" />
        <meta property="og:site_name" content="berrydashboard.io" />
        <meta
          property="article:publisher"
          content="https://www.facebook.com/codedthemes"
        />
        <meta
          property="og:title"
          content="Berry - React Material Dashboard Template"
        />
        <meta
          property="og:description"
          content="Berry Dashboard is made for the faster web application development built using Material-UI, Reactjs, Redux & Hook API."
        />
        <meta
          property="og:image"
          content="https://berrydashboard.io/og-image/og-facebook.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://berrydashboard.io" />
        <meta
          property="twitter:title"
          content="Berry - React Material Dashboard Template"
        />
        <meta
          property="twitter:description"
          content="Berry Dashboard is made for the faster web application development built using Material-UI, Reactjs, Redux & Hook API."
        />
        <meta
          property="twitter:image"
          content="https://berrydashboard.io/og-image/og-twitter.png"
        />
        <meta name="twitter:creator" content="@codedthemes" />
        <Links /> {typeof document === "undefined" ? "__STYLES__" : null}{" "}
      </head>
      <body>
        <Provider store={store}>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Provider>
      </body>
    </html>
  );
}
