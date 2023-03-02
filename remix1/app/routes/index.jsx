import { CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { Outlet } from "@remix-run/react";
import { useSelector } from "react-redux";
import NavigationScroll from "../layout/NavigationScroll";
import theme from "../themes";
import Dashboard from "./dashboard";


export default function Index() {
  const customization = useSelector((state) => state.customization);
  return (
    <>
      <StyledEngineProvider injectfirst>
        <ThemeProvider theme={theme(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Dashboard/>
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}
